const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Product API is running"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});