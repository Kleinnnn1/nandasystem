require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const bcrypt = require("bcryptjs");

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "na_pos",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "Admin",
      username: "admin",
      password: hashed,
      role: "admin",
      isActive: true,
    },
  });

  console.log("✓ Admin user seeded — password: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());