import { Steph } from '../../domain/models/steph';
import { StephRepository } from '../../domain/stephRepository';

export class GetStephUseCase {
    constructor(private readonly stephRepository: StephRepository){}

    async getStephAll(): Promise<Steph[]|null>{
        const getStephAll = await this.stephRepository.getStephAll();

        if(!getStephAll){
            throw new Error("error-get")
        }
        return getStephAll;
    }

    async getStephById(idBovino: string): Promise<Steph | null>{
        const getStephById = await this.stephRepository.getStephById(idBovino);
        if(!getStephById){
            throw new Error("error-get-lpm")
        }
        
        return getStephById;
    }

}