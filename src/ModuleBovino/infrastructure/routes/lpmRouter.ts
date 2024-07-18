import express from "express";
import { lpmController } from "../dependencies";

export const lpmRouter = express.Router();

lpmRouter.post("/register-lpm", lpmController.createLpm.bind(lpmController));
lpmRouter.get("/get-lpm/:id", lpmController.getLpmById.bind(lpmController));
lpmRouter.get("/get-lpm-all", lpmController.getLpmAll.bind(lpmController));
lpmRouter.delete("/delete-lpm/:id", lpmController.deleteLpmById.bind(lpmController));

