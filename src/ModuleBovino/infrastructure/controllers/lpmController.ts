import { Request, Response } from "express";
import { CreateLpmUseCase } from "../../application/lpmUseCase/createLpmUseCase";
import { DeletsLpmUseCase } from "../../application/lpmUseCase/deleteLpmUseCase";
import { GetLpmUseCase } from "../../application/lpmUseCase/getLpmUseCase";


export class LpmController {
    constructor(
        private getLpmUseCase: GetLpmUseCase,
        private deleteLpmUseCase: DeletsLpmUseCase,
        private createLpmUseCase: CreateLpmUseCase,
    ){}

    async createLpm(req: Request, res: Response): Promise<void> {
        const { idBovino, lpm, createAt } = req.body;

        if (!idBovino || !lpm || !createAt) {
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }
        try {
            const newLpm = await this.createLpmUseCase.create(idBovino, lpm, createAt);
            res.status(201).json(newLpm);
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getLpmAll (req: Request, res: Response): Promise<void>{
        try {
            const lpm = await this.getLpmUseCase.getLpmAll()

            res.status(200).json(lpm)
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }

    async getLpmById (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        if(!id){
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }
        try {
            const lpm = await this.getLpmUseCase.getLpmById(id)
            res.status(200).json(lpm)
        } catch (error:any) {
            if(error.message === 'error-get-lpm'){
                res.status(404).json({message:"Registro no encontrado"})

            } else{
                res.status(500).json({ message: 'Error interno del servidor', error })

            }
        }
    }

    async deleteLpmById(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const { id } = req.params;
        
        if (!id) {
            res.status(406).json({ message: "ID de LPM no proporcionado" });
            return;
        }
    
        try {
            await this.deleteLpmUseCase.deleteLpmById(id);
            res.status(200).json({ message: "LPM eliminado correctamente" });
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
       
}
