import { Steph } from "../../domain/models/steph";
import { StephRepository } from "../../domain/stephRepository";
import { Steph as StephModel } from "../mongoModels/stephModel";

export class DbStephRepository implements StephRepository {
    async createSteph(idBovino: string, steph: number, createAt: string): Promise<Steph> {
        const newSteph = new StephModel({ idBovino, steph, createAt });
        const savedSteph = await newSteph.save();
        return new Steph(savedSteph.id, savedSteph.idBovino, savedSteph.steph, savedSteph.createAt);
    }

    async getStephAll(): Promise<Steph[] | null> {
        try{
            const stephDocument = await StephModel.find().exec();
            const steph: Steph[] = stephDocument.map(doc => new Steph(
            doc.id,
            doc.idBovino,
            doc.steph,
            doc.createAt,
        ));
            return steph;
        } catch(error) {
            console.error('Error al obtener todas laos steph:', error);
            return null
            }
        }

        async getStephById(id:string): Promise<Steph | null> {
            try {
                const stephDocument = await StephModel.findOne({ idBovino: id }).exec();
                if(stephDocument){
                    return new Steph  (
                        stephDocument.id,
                        stephDocument.idBovino,
                        stephDocument.steph,
                        stephDocument.createAt,
                    )
                }else {
                        return null
                    }
                } catch (error){
                console.log("Error al obtener el steph:", error);
                    throw error;
                }
            }

            async deleteStephById(id: string): Promise<Steph|null> {
                const stephDelete = await StephModel.findByIdAndDelete(id).exec();
                if(!stephDelete){
                    return null
                }
                return stephDelete.toObject() as Steph;
            }
}