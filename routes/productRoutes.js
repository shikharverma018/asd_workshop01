const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

// GET all products
router.get(
  "/products",
  productController.getAllProducts
);

// GET product by ID
router.get(
  "/products/:id",
  productController.getProductById
);

// POST
router.post(
  "/products",
  productController.createProduct
);

// PUT
router.put(
  "/products/:id",
  productController.updateProduct
);

// PATCH
router.patch(
  "/products/:id",
  productController.patchProduct
);

// DELETE
router.delete(
  "/products/:id",
  productController.deleteProduct
);

module.exports = router;