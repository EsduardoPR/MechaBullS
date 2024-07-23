import { Bovino } from "../../domain/models/bovino";
import { BovinoRepository } from "../../domain/bovinoRepository";
import { Bovino as BovinoModel } from "../mongoModels/bovinoModel";
import { UpdateBovinoData } from "../../domain/types/typesBovino";

export class DbBovinoRepository implements BovinoRepository{
    bovinoRepository: DbBovinoRepository;

    async getAllBovinos(userId:string): Promise<Bovino[]|null> {
        try {
            const bovinosDocuments = await BovinoModel.find({ userId }).exec();
            if(bovinosDocuments){
                const bovinos: Bovino[] = bovinosDocuments.map(doc => {
                    return new Bovino(
                        doc.id,
                        doc.name,
                        doc.siniga,
                        doc.age,
                        doc.lpm,
                        doc.averageSteps,
                        doc.location,
                        doc.userId
                    );
                })
                return bovinos
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error al obtener todos los bovinos:', error);
            return null
        }
    }

    async getBovino(id: string): Promise<Bovino | null>{
       try {
        const bovinoDocument = await BovinoModel.findById(id).exec();
        if(bovinoDocument){
            return new Bovino(
                bovinoDocument.id,
                bovinoDocument.name,
                bovinoDocument.siniga,
                bovinoDocument.age,
                bovinoDocument.lpm,
                bovinoDocument.averageSteps,
                bovinoDocument.location,
                bovinoDocument.userId
            )
        } else {
            return null
        }
       } catch (error) {
        console.error("Error al obtener el bovino por el id:", error)
        throw error;
       } 
    }

    async createBovino(name: string, siniga: string, age: number, userId:string): Promise<Bovino> {
       try {
        const newBovinoDocument = new BovinoModel({
            name: name,
            siniga: siniga,
            age: age,
            userId: userId
        });
        const savedBovinoDocument = await newBovinoDocument.save();
        return new Bovino(
            savedBovinoDocument.id,
            savedBovinoDocument.name,
            savedBovinoDocument.siniga,
            savedBovinoDocument.age,
            savedBovinoDocument.lpm,
            savedBovinoDocument.averageSteps,
            savedBovinoDocument.location,
            savedBovinoDocument.userId
        );
        } catch (error) {
            console.log("Error al crear el usuario", error)
            throw error;
        }
    }
    async checkRepit(name:string):Promise<Bovino | null>{
        try {
            const bovinoDocument = await BovinoModel.findOne({name}).exec();
        if(!bovinoDocument){
            return null
        }
        return new Bovino(
            bovinoDocument.id,
            bovinoDocument.name,
            bovinoDocument.siniga,
            bovinoDocument.age,
            bovinoDocument.lpm,
            bovinoDocument.averageSteps,
            bovinoDocument.location,
            bovinoDocument.userId
        );
        } catch (error) {
            console.log("Error al buscar repetidos")
            throw error;
        }
    }

    async putBovino(idBovino: string, updateData: UpdateBovinoData): Promise<Bovino | null> {
        try {
            const bovinoEncontrado = await BovinoModel.findById(idBovino).exec();
            if (!bovinoEncontrado) {
                return null
            }
            Object.assign(bovinoEncontrado, updateData);
            await bovinoEncontrado.save();
            return bovinoEncontrado.toObject() as Bovino;
        } catch (error) {
            console.log("Error al actualizar Bovino")
            throw error;
        }
    }
    
    async deleteBovino(id: string): Promise<Bovino | null> {
        const bovinoEncontrado = await BovinoModel.findByIdAndDelete(id).exec();
        if(!bovinoEncontrado){
            return null
        }
        return bovinoEncontrado.toObject() as Bovino
    }
    async deleteAllBovinos(): Promise<{deleteCount: number} | null> {
        try {
            const result = await BovinoModel.deleteMany().exec();
             return {deleteCount: result.deletedCount ?? 0};
         } catch (error) {
             console.error('Error al borrar todos los bovinos:', error);
             return null
         }
    }
}