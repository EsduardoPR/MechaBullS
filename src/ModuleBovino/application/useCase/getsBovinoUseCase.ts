import { Bovino } from "../../domain/models/bovino";
import { BovinoRepository } from "../../domain/bovinoRepository";

export class GetsBovinoUseCase {
    constructor(private readonly bovinoRepository: BovinoRepository){}

    async getAllBovinos(userId:string): Promise<Bovino[]|null>{
        const getAll = await this.bovinoRepository.getAllBovinos(userId);
        if(!getAll){
            throw new Error("error-get")
        }
        return getAll
    }
    async getBovino(id:string): Promise<Bovino | null>{
        const getBovino = await this.bovinoRepository.getBovino(id);
        if (!getBovino) {
            throw new Error("error-get-findOneName");
        }
        return getBovino;
    }
}