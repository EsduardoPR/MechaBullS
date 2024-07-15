import { LpmRepository } from "../../domain/lpmRepository";

export class DeletsLpmUseCase {
    constructor(
        private lpmRepository: LpmRepository
    ){}
    async deleteLpmById(id: string){
        const deleteLpm = await this.lpmRepository.deleteLpmById(id);
        if(!deleteLpm){
            throw new Error("Lpm-not-found")
        }
        return deleteLpm
    }
   /*  async deleteAll():Promise<{deleteCount:number} | null>{
        const deleteAll = await this.bovinoRepository.deleteAllBovinos();
        if(!deleteAll){
            throw new Error("error-delete")
        }
        return deleteAll
    }
*/}