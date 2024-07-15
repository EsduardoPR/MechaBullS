import express from "express";
import { locationController } from "../dependencies";

export const locationRouter = express.Router();

locationRouter.post("/register-location", locationController.createLocation.bind(locationController));
locationRouter.get("/get-location-all", locationController.getLocationAll.bind(locationController));
locationRouter.get("/get-location/:id", locationController.getLocationById.bind(locationController));
locationRouter.delete("/delete-location/:id", locationController.deleteLocationById.bind(locationController));