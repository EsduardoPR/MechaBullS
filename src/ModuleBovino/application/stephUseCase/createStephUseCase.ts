import { Steph } from '../../domain/models/steph';
import { StephRepository } from '../../domain/stephRepository'

export class CreateStephUseCase {
    constructor(private stephRepository: StephRepository){}

    async create(idBovino:string, steph:number, createAt:string): Promise<Steph>{
        
        return this.stephRepository.createSteph(idBovino, steph, createAt);
    }

}