import { Request, Response } from "express";
import { CreateStephUseCase } from "../../application/stephUseCase/createStephUseCase";
import { GetStephUseCase } from "../../application/stephUseCase/getsStephUseCase";
import { DeletsStephUseCase } from "../../application/stephUseCase/deletsStephUseCase";

export class StephController {
    constructor(
        private createStephUseCase: CreateStephUseCase,
        private getStephUseCase: GetStephUseCase,
        private deleteStephUseCase: DeletsStephUseCase
    ) {}

    async createSteph(req: Request, res: Response): Promise<void> {
        const { idBovino, steph, createAt } = req.body;

        if (!idBovino || !steph || !createAt) {
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }

        try {
            const newSteph = await this.createStephUseCase.create(idBovino, steph, createAt);
            res.status(201).json(newSteph);
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getStephAll (req: Request, res: Response): Promise<void>{
        try {
            const steph = await this.getStephUseCase.getStephAll()

            res.status(200).json(steph)
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }

    async getStephById (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        if(!id){
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }
        try {
            const steph = await this.getStephUseCase.getStephById(id)
            res.status(200).json(steph)
        } catch (error:any) {
            if(error.message === 'error-get-steph'){
                res.status(404).json({message:"Registro no encontrado"})

            } else{
                res.status(500).json({ message: 'Error interno del servidor', error })

            }
        }
    }

    async deleteStephById(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const { id } = req.params;
        
        if (!id) {
            res.status(406).json({ message: "ID de Steph no proporcionado" });
            return;
        }
    
        try {
            await this.deleteStephUseCase.deleteStephById(id);
            res.status(200).json({ message: "Steph eliminado correctamente" });
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}