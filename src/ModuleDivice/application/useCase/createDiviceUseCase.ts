import { Divice } from '../../domain/models/divice';
import { DiviceRepository } from '../../domain/diviceRepository';

export class CreateDiviceUseCase {
    constructor(private diviceRepository: DiviceRepository){}

    async create(nametag:string, idUser:string, idBovino:string): Promise<Divice>{

        return this.diviceRepository.createDivice(nametag, idUser, idBovino);
    }

}