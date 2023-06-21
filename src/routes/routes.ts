import express, { Router } from "express";
import * as controller from "../controllers/controllers";

const router: Router = express.Router();

router.get("/", controller.faveColourController);
router.post("/", controller.faveColourPostController);
router.get("/reset", controller.resetController);

export default router;
