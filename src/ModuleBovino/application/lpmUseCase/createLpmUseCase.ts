import { Lpm } from '../../domain/models/lpm';
import { LpmRepository } from '../../domain/lpmRepository'

export class CreateLpmUseCase {
    constructor(private lpmRepository: LpmRepository){}

    async create(idBovino:string, lpm:number, createAt:string): Promise<Lpm>{
        return this.lpmRepository.createLpm(idBovino, lpm, createAt);
    }

}