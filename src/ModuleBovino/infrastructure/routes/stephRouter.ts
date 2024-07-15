import express from "express";
import { stephController } from "../dependencies";

export const stephRouter = express.Router();

stephRouter.post("/register-steph", stephController.createSteph.bind(stephController));
stephRouter.get("/get-steph-all", stephController.getStephAll.bind(stephController));
stephRouter.get("/get-steph/:id", stephController.getStephById.bind(stephController));
stephRouter.delete("/delete-steph/:id", stephController.deleteStephById.bind(stephController));