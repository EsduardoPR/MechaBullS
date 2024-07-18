import { Request, Response } from "express";
import { CreateBovinoUseCase } from "../../application/useCase/createBovinoUseCase";
import { GetsBovinoUseCase } from "../../application/useCase/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../../application/useCase/putsBovinoUseCase";
import { DeletsBovinoUseCase } from "../../application/useCase/deletsBovinoUseCase";

export class BovinoController {
    constructor(
        private getsBovinoUseCase: GetsBovinoUseCase,
        private createBovinoUseCase: CreateBovinoUseCase,
        private putBovinoUseCase: PutsBovinoUseCase,
        private deleteBovinoUseCase: DeletsBovinoUseCase
    ){}
    async getAllBovinos (req: Request, res: Response): Promise<void>{
        try {
            const bovinos = await this.getsBovinoUseCase.getAllBovinos();
            res.status(200).json(bovinos)
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }
    async getBovino (req: Request, res:Response): Promise<void>{
        const name = req.body.name;
        if(name === ""){
            res.status(406).json({message: "Nombre no es valido"})
        } 
        try {
            const bovino = await this.getsBovinoUseCase.getBovino(name);
            res.json(bovino);
        } catch (error:any) {
           if(error.message === 'error-get-findOneName'){
            res.status(404).json({ message: "Bovino no encontrado" });
           }
           if(error.message === 'internal-error-get-findOneName"'){
            res.status(500).json({message:"Error interno del servidor"})
           }
        }
    }    
    async createBovino (req: Request, res: Response): Promise<void>{
        const name = req.body.nameBovino;
        const siniga = req.body.sinigaBovino;
        const age = req.body.age;

        if(!name || !siniga || !age){
            res.status(406).json({message:"Uno o más campos vacios"});
        }

        try {
            const newBovino = await this.createBovinoUseCase.create(name, siniga, age)
            res.status(201).json(newBovino)
        } catch (error: any) {
            if(error.message === 'exist'){
                res.status(409).json({message:"El bovino ya existe"})
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }
    async updateBovino(req: Request, res:Response):Promise<void>{
        const name = req.params.name
        const updateData = req.body;
        if(!name || !updateData){
            res.status(406).json({message:"Campos vacios"})
        }
        try {
            const putBovino = await this.putBovinoUseCase.putBovino(name, updateData)
            res.status(200).json({
                bovino: putBovino,
                message:"Bovino actualizado correctamente"
            })

        } catch (error: any) {
            if(error.message === 'Bovino-not-found'){
                res.status(404).json({message: 'No se ah encontrado'});
            } else {
                console.log('Error inesperado', error);
                res.status(500).json({message:"Error interno del servidor"});
            }
        }
    }

    async deleteBovino(req: Request, res:Response){
        const name = req.params.name;
        if(!name){
            res.status(406).json({message:"Campo vacio"})
        }
        try {
            const deleteBovino = await this.deleteBovinoUseCase.deleteBovino(name);
            res.status(200).json({
                bovino: deleteBovino,
                message:"Bovino borrado correctamente"
            })
        } catch (error: any) {
            if(error.message === 'Bovino-not-found'){
                res.status(404).json({message:"No se ah encontrado nada para eliminar"})
            } else {
                console.log('Error inesperado', error)
                res.status(500).json({message:"Error interno del servidor"})
            }
        }
    }
    async deleteAllBovinos(req:Request, res: Response){
        try {
            const deleteBovinos = await this.deleteBovinoUseCase.deleteAll();
            res.status(200).json({
                deleteBovinos: deleteBovinos,
                message:"Todos los bovinos borrados correctamente"
            })
        } catch (error:any) {
            if(error.message === 'error-delete'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }
}