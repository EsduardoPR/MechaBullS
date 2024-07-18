import { LocationRepository } from "../../domain/locationRepository";

export class DeletsLocationUseCase {
    constructor(
        private locationRepository: LocationRepository
    ){}
    async deleteLocationById(id: string){
        const deleteLocation = await this.locationRepository.deleteLocationById(id);
        if(!deleteLocation){
            throw new Error("Location-not-found")
        }
        return deleteLocation
    }
   /*  async deleteAll():Promise<{deleteCount:number} | null>{
        const deleteAll = await this.bovinoRepository.deleteAllBovinos();
        if(!deleteAll){
            throw new Error("error-delete")
        }
        return deleteAll
    }
*/}