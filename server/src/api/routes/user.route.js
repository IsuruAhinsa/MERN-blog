import express from 'express';
import * as UserController from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:id", UserController.update);
router.delete("/destroy/:id", UserController.destroy);
router.get("/:id", UserController.getUser);

export default router;