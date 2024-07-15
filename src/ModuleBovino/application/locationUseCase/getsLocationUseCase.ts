import { Location } from '../../domain/models/location';
import { LocationRepository } from '../../domain/locationRepository';

export class GetLocationUseCase {
    constructor(private readonly locationRepository: LocationRepository){}

    async getLocationAll(): Promise<Location[]|null>{
        const getLocationAll = await this.locationRepository.getLocationAll();

        if(!getLocationAll){
            throw new Error("error-get")
        }
        return getLocationAll;
    }

    async getLocationById(idBovino: string): Promise<Location | null>{
        const getLocation = await this.locationRepository.getLocationById(idBovino);
        if(!getLocation){
            throw new Error("error-get-lpm")
        }
        
        return getLocation;
    }

}