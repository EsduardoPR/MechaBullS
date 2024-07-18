import { Location } from "./models/location";

export interface LocationRepository {
    createLocation(idBovino: string, location: string, createAt: string): Promise<Location>;
    getLocationAll(): Promise<Location[]|null>
    getLocationById(idBovino: string): Promise<Location | null>
    deleteLocationById(id: string): Promise<Location|null> 
}