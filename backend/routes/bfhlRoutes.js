import { Router } from "express";
import { handleBfhlRequest } from "../controllers/bfhlController.js";

const router = Router();

router.post("/", handleBfhlRequest);

export default router;

