import express from "express";
import { bovinoController } from "../dependencies";

export const bovinoRouter = express.Router();

bovinoRouter.post("/get-all", bovinoController.getAllBovinos.bind(bovinoController));
bovinoRouter.post("/get-for-id", bovinoController.getBovino.bind(bovinoController));
bovinoRouter.post("/create", bovinoController.createBovino.bind(bovinoController));
bovinoRouter.put("/update-data", bovinoController.updateBovino.bind(bovinoController));
bovinoRouter.delete("/delete-bovino", bovinoController.deleteBovino.bind(bovinoController));
bovinoRouter.delete("/delete-all", bovinoController.deleteAllBovinos.bind(bovinoController));