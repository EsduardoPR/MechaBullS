import { Model } from "mongoose";
import { Divice } from "../../domain/models/divice";
import { DiviceRepository } from "../../domain/diviceRepository";
import { Divice as DiviceModel } from "../mongoModel/diviceModel";

export class DbDiviceRepository implements DiviceRepository{

    diviceRepository: DbDiviceRepository;

    async createDivice(nametag: string, idUser: string, idBovino: string): Promise<Divice> {
        try {
         const newDiviceDocument = new DiviceModel({
             nametag: nametag,
             idUser: idUser,
             idBovino: idBovino
         });
         const savedDiviceDocument = await newDiviceDocument.save();
         return new Divice(
             savedDiviceDocument.id,
             savedDiviceDocument.nametag,
             savedDiviceDocument.idUser,
             savedDiviceDocument.idBovino,
         );
        } catch (error) {
         console.log("Error al crear el divice", error)
         throw error;
        }
     }

    async getAllDivices(): Promise<Divice[]|null> {
        try {
           const divicesDocuments = await DiviceModel.find().exec();
            const divices: Divice[] = divicesDocuments.map(doc => new Divice(
                doc.id,
                doc.nametag,
                doc.idUser,
                doc.idBovino,
            ));
            return divices;
        } catch (error) {
            console.error('Error al obtener todos los dispositivos:', error);
            return null
        }
    }

    async getDiviceByUser(idUser: string): Promise<Divice | null>{
       try {
        const diviceDocument = await DiviceModel.findOne({ idUser }).exec();
        if(diviceDocument){
            return new Divice(
                diviceDocument.id,
                diviceDocument.nametag,
                diviceDocument.idUser,
                diviceDocument.idBovino,
            )
        } else {
            return null
        }
       } catch (error) {
        console.error("Error al obtener el dispositivo por el id:", error)
        throw error;
       } 
    }
    
    async updateDivice(id: string): Promise<Divice | null> {
        try {
            const diviceEncontrado = await DiviceModel.findOne({ id }).exec();
            if (!diviceEncontrado) {
                return null
            }
            Object.assign(diviceEncontrado);
            await diviceEncontrado.save();
            return diviceEncontrado.toObject() as Divice;
        } catch (error) {
            console.log("Error al actualizar dispositivo")
            throw error;
        }
    }
    
    /* async deleteBovino(name: string): Promise<Bovino | null> {
        const bovinoEncontrado = await BovinoModel.findOneAndDelete({name}).exec();
        if(!bovinoEncontrado){
            return null
        }
        return bovinoEncontrado.toObject() as Bovino
    } */

    /* async deleteAllBovinos(): Promise<{deleteCount: number} | null> {
        try {
            const result = await BovinoModel.deleteMany().exec();
             return {deleteCount: result.deletedCount ?? 0};
         } catch (error) {
             console.error('Error al borrar todos los bovinos:', error);
             return null
         }
    } */
}