const prisma = require("../lib/prisma");

const getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" },
      include: { category: { select: { name: true } } },
    });
    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.name,
      stock: p.stock,
      lastRestocked: p.createdAt,
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const restock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Valid quantity is required." });
  }
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { stock: { increment: parseInt(quantity) } },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getAll, restock };