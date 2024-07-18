import { Bovino } from "../../domain/models/bovino";
import { BovinoRepository } from "../../domain/bovinoRepository";

export class GetsBovinoUseCase {
    constructor(private readonly bovinoRepository: BovinoRepository){}

    async getAllBovinos(): Promise<Bovino[]|null>{
        const getAll = await this.bovinoRepository.getAllBovinos();
        if(!getAll){
            throw new Error("error-get")
        }
        return getAll
    }
    async getBovino(name:string): Promise<Bovino | null>{
        const getBovino = await this.bovinoRepository.getBovino(name);
        if (!getBovino) {
            throw new Error("error-get-findOneName");
        }
        return getBovino;
    }
}