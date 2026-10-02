const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const {
  cacheMiddleware,
  clearCache
} = require("../middleware/cacheMiddleware");

// GET all products
router.get(
  "/products",
  cacheMiddleware,
  productController.getAllProducts
);

// GET product by ID
router.get(
  "/products/:id",
  cacheMiddleware,
  productController.getProductById
);

// POST
router.post(
  "/products",
  async (req, res, next) => {
    try {
      await productController.createProduct(req, res);

      // Clear cache only after successful response
      if (res.statusCode >= 200 && res.statusCode < 300) {
        clearCache();
      }
    } catch (error) {
      next(error);
    }
  }
);

// PUT
router.put(
  "/products/:id",
  async (req, res, next) => {
    try {
      await productController.updateProduct(req, res);

      if (res.statusCode >= 200 && res.statusCode < 300) {
        clearCache();
      }
    } catch (error) {
      next(error);
    }
  }
);

// PATCH
router.patch(
  "/products/:id",
  async (req, res, next) => {
    try {
      await productController.patchProduct(req, res);

      if (res.statusCode >= 200 && res.statusCode < 300) {
        clearCache();
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE
router.delete(
  "/products/:id",
  async (req, res, next) => {
    try {
      await productController.deleteProduct(req, res);

      if (res.statusCode >= 200 && res.statusCode < 300) {
        clearCache();
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;