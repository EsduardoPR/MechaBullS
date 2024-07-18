import { Divice } from "../../domain/models/divice";
import { DiviceRepository } from "../../domain/diviceRepository";

export class GetsDiviceUseCase {
    constructor(private readonly diviceRepository: DiviceRepository){}

    async getAllDivices(): Promise<Divice[]|null>{
        const getAll = await this.diviceRepository.getAllDivices();
        if(!getAll){
            throw new Error("error-get")
        }
        return getAll
    }

    async getDiviceByUser(idUser:string): Promise<Divice | null>{
        const getDiviceByUser = await this.diviceRepository.getDiviceByUser(idUser);
        if (!getDiviceByUser) {
            throw new Error("error-get-findOneName");
        }
        return getDiviceByUser;
    }
}