import { BovinoRepository } from "../../domain/bovinoRepository";

export class DeletsBovinoUseCase {
    constructor(
        private bovinoRepository: BovinoRepository
    ){}
    async deleteBovino(name: string){
        const deleteBovino = await this.bovinoRepository.deleteBovino(name);
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