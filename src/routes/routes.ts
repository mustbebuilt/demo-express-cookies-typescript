import express, { Router } from "express";
import {
  faveColourController,
  faveColourPostController,
  resetController
} from "../controllers/controllers";

const router: Router = express.Router();

router.get("/", faveColourController);
router.post("/", faveColourPostController);
router.get("/reset", resetController);

export default router;
