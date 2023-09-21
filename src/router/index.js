const express = require('express');
const router = express();
const productController = require('../../controllers/product');
const categoryController = require('../../controllers/category');
const universeController = require('../../controllers/universe');
const orderController = require('../../controllers/order');

router.use(express.json());

// Get all products
router.get(`/products`, productController.getProducts);
// Get one product
router.get(`/product/:productID`, productController.getOneProduct);
// Create a product
router.post(`/product`, productController.createProduct);
// Delete a product
router.delete(`/product/:productID`, productController.deleteProduct);
// Update a product
router.put(`/product/:productID`, productController.updateProduct);

/* ********************************************************************************************************** */

// Get all categories
router.get(`/categories`, categoryController.getCategories);
// Get one category
router.get(`/category/:categoryID`, categoryController.getOneCategory);
// Create a category
router.post(`/category`, categoryController.createCategory);
// Delete a category
router.delete(`/category/:categoryID`, categoryController.deleteCategory);
// Update a category
router.put(`/category/:categoryID`, categoryController.updateCategory);

/* ********************************************************************************************************** */

// Get all universes
router.get(`/universes`, universeController.getUniverses);
// Get one universe
router.get(`/universe/:universeID`, universeController.getOneUniverse);
// Create a universe
router.post(`/universe`, universeController.createUniverse);
// Delete a universe
router.delete(`/universe/:universeID`, universeController.deleteUniverse);
// Update a universe
router.put(`/universe/:universeID`, universeController.updateUniverse);

/* ********************************************************************************************************** */

// Get all orders
router.get(`/orders`, orderController.getOrders);
// Get user orders
router.get(`/orders/:userID`, orderController.getUserOrders);
// Create a order
router.post(`/order/:userID`, orderController.createOrder);
// Delete a order
router.delete(`/order/:userID`, orderController.deleteOrder);
// Update a order
router.put(`/order/:userID`, orderController.updateOrder);

module.exports = router;
