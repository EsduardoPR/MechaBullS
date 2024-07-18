import express from "express";
import { diviceController } from "../dependencies";

export const diviceRouter = express.Router();

diviceRouter.post("/create", diviceController.createDivice.bind(diviceController));
diviceRouter.get("/get-all", diviceController.getAllDivices.bind(diviceController));
diviceRouter.post("/get-for-user", diviceController.getDiviceByUser.bind(diviceController));
diviceRouter.put("/update/:id", diviceController.updateDivice.bind(diviceController));
// bovinoRouter.delete("/delete-bovino/:name", bovinoController.deleteBovino.bind(bovinoController));
// bovinoRouter.delete("/delete-all", bovinoController.deleteAllBovinos.bind(bovinoController));