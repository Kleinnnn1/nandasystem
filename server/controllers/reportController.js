const prisma = require("../lib/prisma");

const getSalesReport = async (req, res) => {
  const { period = "today" } = req.query;

  const now = new Date();
  let startDate;

  if (period === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === "week") {
    const day = now.getDay(); // 0 = Sunday
    startDate = new Date(now);
    startDate.setDate(now.getDate() - day);
    startDate.setHours(0, 0, 0, 0);
  } else if (period === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    return res.status(400).json({ error: "Invalid period. Use today, week, or month." });
  }

  try {
    // Get all sales within the period
    const sales = await prisma.sale.findMany({
      where: { createdAt: { gte: startDate } },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true } },
          },
        },
      },
    });

    // Aggregate per product
    const productMap = new Map();
    for (const sale of sales) {
      for (const item of sale.items) {
        const key = item.productId;
        if (!productMap.has(key)) {
          productMap.set(key, {
            productId: item.productId,
            productName: item.product.name,
            qtySold: 0,
            revenue: 0,
          });
        }
        const entry = productMap.get(key);
        entry.qtySold += item.quantity;
        entry.revenue += item.total;
      }
    }

    const items = Array.from(productMap.values()).sort(
      (a, b) => b.revenue - a.revenue
    );

    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    const totalOrders = sales.length;
    const totalItemsSold = items.reduce((sum, i) => sum + i.qtySold, 0);

    res.json({
      period,
      totalRevenue,
      totalOrders,
      totalItemsSold,
      items,
    });
  } catch (error) {
    console.error("Failed to fetch sales report:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getSalesReport };