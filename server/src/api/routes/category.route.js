import express from "express";
import * as CategoryController from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", CategoryController.index);
router.post("/store", CategoryController.store);

export default router;
