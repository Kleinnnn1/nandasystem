const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");


const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, username: true, role: true, isActive: true, lastLogin: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const create = async (req, res) => {
  const { name, username, role, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ error: "Name, username and password are required." });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, username, password: hashed, role: role || "cashier" },
      select: { id: true, name: true, username: true, role: true, isActive: true },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Username already exists." });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, username, role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, username, role },
      select: { id: true, name: true, username: true, role: true, isActive: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { password: hashed },
    });
    res.json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

const toggleActive = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    const updated = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: !user.isActive },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { getAll, create, update, changePassword, toggleActive };