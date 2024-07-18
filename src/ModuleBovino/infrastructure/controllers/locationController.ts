import { Request, Response } from "express";
import { CreateLocationUseCase } from "../../application/locationUseCase/createLocationUseCase";
import { GetLocationUseCase } from "../../application/locationUseCase/getsLocationUseCase";
import { DeletsLocationUseCase } from "../../application/locationUseCase/deletsLocationUseCae";

export class LocationController {
    constructor(
        private createLocationUseCase: CreateLocationUseCase,
        private getsLocationUseCase: GetLocationUseCase,
        private deletsLocationUseCase: DeletsLocationUseCase
    ) {}

    async createLocation(req: Request, res: Response): Promise<void> {
        const { idBovino, location, createAt } = req.body;

        if (!idBovino || !location || !createAt) {
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }

        try {
            const newLocation = await this.createLocationUseCase.create(idBovino, location, createAt);
            res.status(201).json(newLocation);
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    async getLocationAll (req: Request, res: Response): Promise<void>{
        try {
            const location = await this.getsLocationUseCase.getLocationAll()

            res.status(200).json(location)
        } catch (error:any) {
            if(error.message === 'error-get'){
                res.status(500).json({message: 'Error interno del servidor', error})
            }
        }
    }

    async getLocationById (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        if(!id){
            res.status(406).json({ message: "Uno o más campos vacíos" });
            return;
        }
        try {
            const location = await this.getsLocationUseCase.getLocationById(id)
            res.status(200).json(location)
        } catch (error:any) {
            if(error.message === 'error-get-location'){
                res.status(404).json({message:"Registro no encontrado"})

            } else{
                res.status(500).json({ message: 'Error interno del servidor', error })

            }
        }
    }

    async deleteLocationById(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const { id } = req.params;
        
        if (!id) {
            res.status(406).json({ message: "ID de Location no proporcionado" });
            return;
        }
    
        try {
            await this.deletsLocationUseCase.deleteLocationById(id);
            res.status(200).json({ message: "Location eliminado correctamente" });
        } catch (error: any) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}