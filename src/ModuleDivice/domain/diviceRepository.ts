import { Divice } from './models/divice'

export interface DiviceRepository {
    createDivice(name: string, idUser: string, idBovino: string): Promise<Divice>;
    getAllDivices(): Promise<Divice[]|null>;
    getDiviceByUser(idUser:string): Promise<Divice | null>;
    updateDivice(id: string, updateData: []): Promise<Divice | null>;
    // deleteDivice(id:string):Promise<Divice | null>
    // deleteAllDivices():Promise<{deleteCount:number} | null>
}