import { BovinoRepository } from "../../domain/bovinoRepository";
import { Bovino } from "../../domain/models/bovino";

export class DeletsBovinoUseCase {
    constructor(
        private bovinoRepository: BovinoRepository
    ){}
    async deleteBovino(id: string):Promise<Bovino|null>{
        const deleteBovino = await this.bovinoRepository.deleteBovino(id);
        if(!deleteBovino){
            throw new Error("Bovino-not-found")
        }
        return deleteBovino
    }
    async deleteAll():Promise<{deleteCount:number} | null>{
        const deleteAll = await this.bovinoRepository.deleteAllBovinos();
        if(!deleteAll){
            throw new Error("error-delete")
        }
        return deleteAll
    }
}