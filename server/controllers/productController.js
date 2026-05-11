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
      price: p.price,
      stock: p.stock,
      barcode: p.barcode,
      category: p.category.name,
      categoryId: p.categoryId,
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const create = async (req, res) => {
  const { name, price, stock, barcode, categoryId } = req.body;
  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: "Name, price and category are required." });
  }
  try {
    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), stock: parseInt(stock) || 0, barcode, categoryId: parseInt(categoryId) },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, barcode, categoryId } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price: parseFloat(price), stock: parseInt(stock), barcode, categoryId: parseInt(categoryId) },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getAll, create, update, remove };