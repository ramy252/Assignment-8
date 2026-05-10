import { Router } from "express";
import { createLogs, getLogs } from "./log.service.js";

const router = Router();
// 3. Create a capped collection named “logs” with a size limit of 1MB. (0.5 Grade)

router.get("/", getLogs);
router.post("/capped", createLogs);

export default router;
