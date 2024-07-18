
import { Location } from '../../domain/models/location';
import { LocationRepository } from '../../domain/locationRepository'

export class CreateLocationUseCase {
    constructor(private locationRepository: LocationRepository){}

    async create(idBovino:string, location:string, createAt:string): Promise<Location>{
        
        return this.locationRepository.createLocation(idBovino, location, createAt);
    }

}