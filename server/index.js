const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const inventoryRoutes = require("./routes/inventory");
const userRoutes = require("./routes/users");
const saleRoutes = require("./routes/sales");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "N&A POS API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});