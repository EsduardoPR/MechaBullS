import { Request, Response } from "express";
import { CreateDiviceUseCase } from "../../application/useCase/createDiviceUseCase";
import { GetsDiviceUseCase } from "../../application/useCase/getsDiviceUseCase";
import { UpdateDiviceUseCase } from "../../application/useCase/updateDiviceUseCase";
// import { DeletsBovinoUseCase } from "../../application/useCase/deletsBovinoUseCase";

export class DiviceController {
    constructor(
        private createDiviceUseCase: CreateDiviceUseCase,
        private getsDiviceUseCase: GetsDiviceUseCase,
        private updateDiviceUseCase: UpdateDiviceUseCase,
        // private deleteBovinoUseCase: DeletsBovinoUseCase
    ){}

    async createDivice (req: Request, res: Response): Promise<void>{
        const nametag = req.body.nametag;
        const idUser = req.body.idUser;
        const idBovino = req.body.idBovino;

        if(!nametag || !idUser || !idBovino){
            res.status(406).json({message:"Uno o más campos vacios"});
        }

        try {
            const newDivice = await this.createDiviceUseCase.create(nametag, idUser, idBovino)
            res.status(201).json(newDivice)
        } catch (error: any) {
            if(error.message === 'exist'){
                res.status(409).json({message:"El divice ya existe"})
            } else {
                res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }

    async getAllDivices (req: Request, res: Response): Promise<void>{
        try {
            const divices = await this.getsDiviceUseCase.getAllDivices();
            res.status(200).json(divices)
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }

    async getDiviceByUser (req: Request, res:Response): Promise<void>{
        const idUser = req.body.idUser;
        if(idUser === ""){
            res.status(406).json({message: "Id no es valido"})
        } 
        try {
            const divice = await this.getsDiviceUseCase.getDiviceByUser(idUser);
            res.json(divice);
        } catch (error:any) {
           if(error.message === 'error-get-findOneName'){
            res.status(404).json({ message: "Dispocitivo no encontrado" });
           }
           if(error.message === 'internal-error-get-findOneName"'){
            res.status(500).json({message:"Error interno del servidor"})
           }
        }
    } 

    async updateDivice(req: Request, res:Response):Promise<void>{
        const id = req.params.id
        const updateData = req.body;
        if(!id || !updateData){
            res.status(406).json({message:"Campos vacios"})
        }
        try {
            const updatedivice = await this.updateDiviceUseCase.updateDivice(id, updateData)
            res.status(200).json({
                divice: updatedivice,
                message:"dispositivo actualizado correctamente"
            })

        } catch (error: any) {
            if(error.message === 'dispositivo-not-found'){
                res.status(404).json({message: 'No se ah encontrado'});
            } else {
                console.log('Error inesperado', error);
                res.status(500).json({message:"Error interno del servidor"});
            }
        }
    }

    /* async deleteBovino(req: Request, res:Response){
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
    } */

    /* async deleteAllBovinos(req:Request, res: Response){
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
    } */
}