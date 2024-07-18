import { Lpm } from "../../domain/models/lpm";
import { LpmRepository } from "../../domain/lpmRepository";
import { Lpm as LpmModel } from "../mongoModels/lpmModel";
import { error } from "console";

export class DbLpmRepository implements LpmRepository {
    
    async createLpm(idBovino: string, lpm: number, createAt: string): Promise<Lpm> {
        const newLpm = new LpmModel({ idBovino, lpm, createAt });
        const savedLpm = await newLpm.save();
        return new Lpm(savedLpm.id, savedLpm.idBovino, savedLpm.lpm, savedLpm.createAt);
    }

    async getLpmAll(): Promise<Lpm[]|null> {
        try {
            const lpmsDocuments = await LpmModel.find().exec();
            const lpms: Lpm[] = lpmsDocuments.map(doc => new Lpm(
                doc.id,
                doc.idBovino,
                doc.lpm,
                doc.createAt,
            ));
            console.log(lpms);
            return lpms;
        } catch (error) {
            console.error('Error al obtener todos los lpms:', error);
            return null
        }
    }

    async getLpmById(id:string): Promise<Lpm | null> {
        try {
            const lpmDocument = await LpmModel.findOne({ idBovino: id }).exec();
            if(lpmDocument){
                return new Lpm  (
                    lpmDocument.id,
                    lpmDocument.idBovino,
                    lpmDocument.lpm,
                    lpmDocument.createAt,
                )
            }else {
                return null
            }
        } catch (error){
        console.log("Error al obtener el lpm:", error);
            throw error;
        }
    }

    async deleteLpmById(id: string): Promise<Lpm|null> {
        const lpmDelete = await LpmModel.findByIdAndDelete(id).exec();
        if(!lpmDelete){
            return null
        }
        return lpmDelete.toObject() as Lpm;
    }
}
