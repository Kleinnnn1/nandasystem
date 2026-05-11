const prisma = require("../lib/prisma");

const getAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    });
    const mapped = categories.map((c) => ({
      id: c.id,
      name: c.name,
      productCount: c._count.products,
    }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required." });
  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required." });
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await prisma.product.count({
      where: { categoryId: parseInt(id) },
    });
    if (count > 0) {
      return res.status(400).json({ error: "Cannot delete category with existing products." });
    }
    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getAll, create, update, remove };