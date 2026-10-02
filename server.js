const express = require('express');
const app = express();
const fs = require('fs/promises');
const path = require('path');

const PathToFile = path.join(__dirname, "db.json");
const port = 3000;

const cache = {};

async function readFile() {
  try {
    const data = await fs.readFile(PathToFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

app.get('/products/:id', async (req, res) => {
  try {
    const key = req.url;

    // Check cache
    if (cache[key]) {
      console.log("Data from cache");
      return res.json(cache[key]);
    }

    // Read from db.json
    const products = await readFile();

    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Store product in cache
    cache[key] = product;

    console.log("Data from database");

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});