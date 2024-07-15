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

    /* async getAllBovinos(): Promise<Bovino[]|null> {
        try {
           const bovinosDocuments = await BovinoModel.find().exec();
            const bovinos: Bovino[] = bovinosDocuments.map(doc => new Bovino(
                doc.id,
                doc.name,
                doc.siniga,
                doc.age,
                doc.lpm,
                doc.averageSteps,
                doc.location
            ));
            return bovinos;
        } catch (error) {
            console.error('Error al obtener todos los bovinos:', error);
            return null
        }
    } */

    /* async getBovino(name: string): Promise<Bovino | null>{
       try {
        const bovinoDocument = await BovinoModel.findOne({name}).exec();
        if(bovinoDocument){
            return new Bovino(
                bovinoDocument.id,
                bovinoDocument.name,
                bovinoDocument.siniga,
                bovinoDocument.age,
                bovinoDocument.lpm,
                bovinoDocument.averageSteps,
                bovinoDocument.location
            )
        } else {
            return null
        }
       } catch (error) {
        console.error("Error al obtener el bovino por el id:", error)
        throw error;
       } 
    } */
    
    /*   */
}