const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
    });

    let matchedUser = null;
    for (const user of users) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(401).json({ error: "Invalid password." });
    }

    await prisma.user.update({
      where: { id: matchedUser.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign(
      { id: matchedUser.id, name: matchedUser.name, role: matchedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: matchedUser.id,
        name: matchedUser.name,
        role: matchedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { login };