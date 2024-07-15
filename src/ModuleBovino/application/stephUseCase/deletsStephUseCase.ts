import { StephRepository } from "../../domain/stephRepository";

export class DeletsStephUseCase {
    constructor(
        private stephRepository: StephRepository
    ){}
    async deleteStephById(id: string){
        const deleteSteph = await this.stephRepository.deleteStephById(id);
        if(!deleteSteph){
            throw new Error("Steph-not-found")
        }
        return deleteSteph
    }
   /*  async deleteAll():Promise<{deleteCount:number} | null>{
        const deleteAll = await this.bovinoRepository.deleteAllBovinos();
        if(!deleteAll){
            throw new Error("error-delete")
        }
        return deleteAll
    }
*/}