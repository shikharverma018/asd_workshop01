const productDatabase = require("../database/productDatabase");

async function getAllProducts() {
  return await productDatabase.getAllProducts();
}

async function getProductById(id) {
  return await productDatabase.getProductById(id);
}

async function createProduct(productData) {
  const products = await productDatabase.getAllProducts();

  const newId =
    products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;

  const newProduct = {
    id: newId,
    ...productData
  };

  return await productDatabase.createProduct(newProduct);
}

async function updateProduct(id, productData) {
  return await productDatabase.updateProduct(id, productData);
}

async function patchProduct(id, productData) {
  return await productDatabase.patchProduct(id, productData);
}

async function deleteProduct(id) {
  return await productDatabase.deleteProduct(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};