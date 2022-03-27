import express from "express";
import * as PostController from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", PostController.index);
router.get("/:id", PostController.getById);
router.post("/store", PostController.store);
router.put("/update/:id", PostController.update);
router.delete("/destroy/:id", PostController.destroy);

export default router;