const prisma = require("../lib/prisma");

const create = async (req, res) => {
  const { items, total, discount, cash, change } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items in order." });
  }

  try {
    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.sale.create({
        data: {
          total,
          discount,
          cash,
          change,
          userId,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              total: item.total,
            })),
          },
        },
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newSale;
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        items: {
          include: { product: { select: { name: true } } },
        },
      },
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { create, getAll };