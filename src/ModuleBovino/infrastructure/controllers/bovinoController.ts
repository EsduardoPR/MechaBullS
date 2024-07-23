import { Request, Response } from "express";
import { CreateBovinoUseCase } from "../../application/useCase/createBovinoUseCase";
import { GetsBovinoUseCase } from "../../application/useCase/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../../application/useCase/putsBovinoUseCase";
import { DeletsBovinoUseCase } from "../../application/useCase/deletsBovinoUseCase";

import { UserController } from "../../../ModuleUser/infraestructure/controllers/userController";

export class BovinoController {
    constructor(
        private getsBovinoUseCase: GetsBovinoUseCase,
        private createBovinoUseCase: CreateBovinoUseCase,
        private putBovinoUseCase: PutsBovinoUseCase,
        private deleteBovinoUseCase: DeletsBovinoUseCase,
        private userController:UserController,
    ){}


    async getAllBovinos (req: Request, res: Response): Promise<void>{
        const { token } = req.body
        if(!token){
            res.status(406).json({message:"Uno o más campos vacios"});
            return;
        }
        try {
            const tokenV = await this.userController.verifyToken(token)
            if(tokenV){
                const bovinos = await this.getsBovinoUseCase.getAllBovinos(tokenV);
                res.status(200).json(bovinos)
            }
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(204).json({message:'no-content'})
            } else if(error.message === 'token-invalid') {
                res.status(401).json({message:'token-expired'})
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }


    async getBovino (req: Request, res:Response): Promise<void>{
        const { id, token} = req.body
        if(!id || !token){
            res.status(406).json({message:"Uno o más campos vacios"});
            return;
        } 
        try {
            const tokenV = await this.userController.verifyToken(token)
            if(tokenV){
                const bovino = await this.getsBovinoUseCase.getBovino(id);
                res.status(200).json(bovino)
            }
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
        const { nameBovino, sinigaBovino, ageBovino, token} = req.body
        if(!nameBovino || !sinigaBovino || !ageBovino || !token){
            res.status(406).json({message:"Uno o más campos vacios"});
            return;
        }
        try {
            const tokenV = await this.userController.verifyToken(token)
            if(tokenV){
                const newBovino = await this.createBovinoUseCase.create(nameBovino, sinigaBovino, ageBovino, tokenV)
                res.status(201).json(newBovino)
            }
        } catch (error: any) {
            if(error.message === 'exist'){
                res.status(409).json({message:"El bovino ya existe"})
            } else if(error.message === 'token-invalid') {
                res.status(401).json({message:'token-expired'})
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }
    async updateBovino(req: Request, res:Response):Promise<void>{
        const { token, updateData, idBovino } = req.body;
        if(!token || !updateData || !idBovino){
            res.status(406).json({message:"Campos vacios"})
            return;
        }
        try {
            const tokenV = await this.userController.verifyToken(token)
            if(tokenV){
                const putBovino = await this.putBovinoUseCase.putBovino(idBovino, updateData)
                res.status(200).json({
                    bovino: putBovino,
                    message:"Bovino actualizado correctamente"
                })
            }
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
        const id = req.query.id as string;;
        const token = req.query.token as string;
        if(!id || !token){
            res.status(406).json({message:"Campo vacio"})
            return;
        }
        try {
            const tokenV = await this.userController.verifyToken(token)
            if(tokenV){
                const deleteBovino = await this.deleteBovinoUseCase.deleteBovino(id);
                res.status(200).json({
                    bovino: deleteBovino,
                    message:"Bovino borrado correctamente"
                })
            }
        } catch (error: any) {
            if(error.message === 'Bovino-not-found'){
                res.status(404).json({message:"No se ah encontrado nada para eliminar"})
            } else if(error.message === 'token-invalid') {
                res.status(401).json({message:'token-expired'})
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
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