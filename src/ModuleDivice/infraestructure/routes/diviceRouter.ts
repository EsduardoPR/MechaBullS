import express from "express";
import { diviceController } from "../dependencies";

export const diviceRouter = express.Router();

diviceRouter.post("/create", diviceController.createDivice.bind(diviceController));
// bovinoRouter.post("/get-for-name", bovinoController.getBovino.bind(bovinoController));
// diviceRouter.get("/get-all", bovinoController.getAllBovinos.bind(bovinoController));
// bovinoRouter.put("/update-data/:name", bovinoController.updateBovino.bind(bovinoController));
// bovinoRouter.delete("/delete-bovino/:name", bovinoController.deleteBovino.bind(bovinoController));
// bovinoRouter.delete("/delete-all", bovinoController.deleteAllBovinos.bind(bovinoController));