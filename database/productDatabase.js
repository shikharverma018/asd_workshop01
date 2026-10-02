const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "db.json");

async function readDatabase() {
  const data = await fs.readFile(pathToFile, "utf-8");

  return JSON.parse(data);
}

async function writeDatabase(data) {
  await fs.writeFile(
    pathToFile,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// GET all products
async function getAllProducts() {
  return await readDatabase();
}

// GET product by ID
async function getProductById(id) {
  const products = await readDatabase();

  return products.find(
    (product) => product.id === Number(id)
  );
}

// POST
async function createProduct(product) {
  const products = await readDatabase();

  products.push(product);

  await writeDatabase(products);

  return product;
}

// PUT
async function updateProduct(id, productData) {
  const products = await readDatabase();

  const index = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...productData,
    id: Number(id)
  };

  await writeDatabase(products);

  return products[index];
}

// PATCH
async function patchProduct(id, productData) {
  const products = await readDatabase();

  const index = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...productData,
    id: Number(id)
  };

  await writeDatabase(products);

  return products[index];
}

// DELETE
async function deleteProduct(id) {
  const products = await readDatabase();

  const index = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  const deletedProduct = products.splice(index, 1)[0];

  await writeDatabase(products);

  return deletedProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};