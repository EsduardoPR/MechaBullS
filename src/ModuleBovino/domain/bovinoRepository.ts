import { Bovino } from './models/bovino'
import { UpdateBovinoData } from './types/typesBovino';
export interface BovinoRepository {
    getAllBovinos(userId:string): Promise<Bovino[]|null>;
    getBovino(id:string): Promise<Bovino | null>;
    
    
    createBovino(name: string, siniga: string, age: number, userId:string): Promise<Bovino>;
    checkRepit(name:string):Promise<Bovino | null>

    putBovino(idBovino:string, updateData: UpdateBovinoData):Promise<Bovino | null>

    deleteBovino(id:string):Promise<Bovino | null>
    deleteAllBovinos():Promise<{deleteCount:number} | null>
}