import { Divice } from "../../domain/models/divice";
import { DiviceRepository} from "../../domain/diviceRepository";
export class UpdateDiviceUseCase{ 
    constructor(
        private diviceRepository: DiviceRepository
    ){}

    async updateDivice(id: string, updateData: []): Promise<Divice | null>{
        const updateDivice = await this.diviceRepository.updateDivice(id,updateData)
        if (!updateDivice) {
            throw new Error('divice-not-found');
        }
        return updateDivice
    }
}