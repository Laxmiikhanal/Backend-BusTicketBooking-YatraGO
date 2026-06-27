import { Router } from "express";
import { getAllBuses, getBusById, seedBuses } from "../controllers/bus.controller";

const router = Router();

router.get("/", getAllBuses);
router.get("/seed", seedBuses);
router.get("/:id", getBusById);

export default router;
