import { Location } from "../../domain/models/location";
import { LocationRepository } from "../../domain/locationRepository";
import {Location as LocationModel } from "../mongoModels/locationModel";

export class DbLocationRepository implements LocationRepository {
    async createLocation(idBovino: string, location: string, createAt: string): Promise<Location> {
        const newLocation = new LocationModel({ idBovino, location, createAt });
        const savedLocation = await newLocation.save();
        return new Location(savedLocation.id, savedLocation.idBovino, savedLocation.location, savedLocation.createAt);
    }

    async getLocationAll(): Promise<Location[] | null> {
        try{
            const locationsDocument = await LocationModel.find().exec();
            const locations: Location[] = locationsDocument.map(doc => new Location(
            doc.id,
            doc.idBovino,
            doc.location,
            doc.createAt,
        ));
            return locations;
        } catch(error) {
            console.error('Error al obtener todas las locaciones:', error);
            return null
            }
        }

    async getLocationById(id:string): Promise<Location | null> {
        try {
            const locationDocument = await LocationModel.findOne({ idBovino: id }).exec();
            if(locationDocument){
                return new Location  (
                    locationDocument.id,
                    locationDocument.idBovino,
                    locationDocument.location,
                    locationDocument.createAt,
                )
            }else {
                    return null
                }
            } catch (error){
            console.log("Error al obtener el location:", error);
                throw error;
            }
        }

        async deleteLocationById(id: string): Promise<Location|null> {
            const locationDelete = await LocationModel.findByIdAndDelete(id).exec();
            if(!locationDelete){
                return null
            }
            return locationDelete.toObject() as Location;
        }
}
