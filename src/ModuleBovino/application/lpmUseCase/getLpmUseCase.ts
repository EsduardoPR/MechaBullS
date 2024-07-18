import { Lpm } from '../../domain/models/lpm';
import { LpmRepository } from '../../domain/lpmRepository'

export class GetLpmUseCase {
    constructor(private readonly lpmRepository: LpmRepository){}

    async getLpmAll(): Promise<Lpm[]|null>{
        const getLpmAll = await this.lpmRepository.getLpmAll();

        if(!getLpmAll){
            throw new Error("error-get")
        }
        return getLpmAll;
    }

    async getLpmById(idBovino: string): Promise<Lpm | null>{
        const getLpm = await this.lpmRepository.getLpmById(idBovino);
        if(!getLpm){
            throw new Error("error-get-lpm")
        }
        
        return getLpm;
    }

}