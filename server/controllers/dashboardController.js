const prisma = require("../lib/prisma");

const getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's sales
    const todaySales = await prisma.sale.findMany({
      where: { createdAt: { gte: today, lt: tomorrow } },
      include: { items: true },
    });

    const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
    const todayTransactions = todaySales.length;

    // Low stock count
    const lowStockCount = await prisma.product.count({
      where: { stock: { lte: 5, gt: 0 } },
    });

    // Out of stock count
    const outOfStockCount = await prisma.product.count({
      where: { stock: 0 },
    });

    // Total products
    const totalProducts = await prisma.product.count();

    // Weekly sales
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const weeklySales = await prisma.sale.findMany({
      where: { createdAt: { gte: weekStart } },
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const daySales = weeklySales.filter((s) => {
        const saleDate = new Date(s.createdAt);
        return saleDate >= date && saleDate < nextDate;
      });

      return {
        day: days[date.getDay()],
        sales: daySales.reduce((sum, s) => sum + s.total, 0),
      };
    });

    // Top products
    const saleItems = await prisma.saleItem.findMany({
      where: { sale: { createdAt: { gte: today, lt: tomorrow } } },
      include: { product: { include: { category: true } } },
    });

    const productMap = new Map();
    saleItems.forEach((item) => {
      const key = item.productId;
      if (productMap.has(key)) {
        productMap.get(key).sales += item.total;
      } else {
        productMap.set(key, {
          name: item.product.name,
          category: item.product.category.name,
          sales: item.total,
        });
      }
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4)
      .map((p, i) => ({
        rank: i + 1,
        name: p.name,
        category: p.category,
        sales: p.sales,
        percentage: 0,
      }));

    if (topProducts.length > 0) {
      const maxSales = topProducts[0].sales;
      topProducts.forEach((p) => {
        p.percentage = Math.round((p.sales / maxSales) * 100);
      });
    }

    // Low stock items
    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lte: 10 } },
      orderBy: { stock: "asc" },
      take: 5,
      include: { category: true },
    });

    // Recent transactions
    const recentTransactions = await prisma.sale.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    res.json({
      todayRevenue,
      todayTransactions,
      lowStockCount,
      outOfStockCount,
      totalProducts,
      weeklyData,
      topProducts,
      lowStockItems: lowStockItems.map((p) => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        threshold: 10,
      })),
      recentTransactions: recentTransactions.map((s, i) => ({
        id: `TXN-${String(s.id).padStart(4, "0")}`,
        time: new Date(s.createdAt).toLocaleTimeString("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: s.total,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getStats };