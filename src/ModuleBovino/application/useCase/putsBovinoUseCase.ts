import { Bovino } from "../../domain/models/bovino";
import { BovinoRepository} from "../../domain/bovinoRepository";
import { UpdateBovinoData } from "../../domain/types/typesBovino";
export class PutsBovinoUseCase{ 
    constructor(
        private bovinoRepository: BovinoRepository
    ){}

    async putBovino(idBovino: string, updateData:UpdateBovinoData): Promise<Bovino | null>{
        const updateBovino = await this.bovinoRepository.putBovino(idBovino, updateData)
        if (!updateBovino) {
            throw new Error('Bovino-not-found');
        }
        return updateBovino
    }
}