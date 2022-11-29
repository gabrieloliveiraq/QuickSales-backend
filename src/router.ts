import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/Products/listProducts";
import { createProduct } from "./app/useCases/Products/createProduct";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/Orders/listOrders";
import { createOrder } from "./app/useCases/Orders/createOrder";
import { changeOrderStatus } from "./app/useCases/Orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/Orders/cancelOrder";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get("/categories", listCategories);

// Create category
router.post("/categories", createCategories);

// List products
router.get("/products", listProducts);

// Create product
router.post("/products", upload.single("image"), createProduct);

// Get products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// List orders
router.get("/orders", listOrders);

// Create orders
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// delete/cancel order
router.delete("/categories/:orderId", cancelOrder);
