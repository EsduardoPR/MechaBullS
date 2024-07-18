import { Bovino } from './models/bovino'
import { UpdateBovinoData } from './types/typesBovino';
export interface BovinoRepository {
    getAllBovinos(): Promise<Bovino[]|null>;
    getBovino(name:string): Promise<Bovino | null>;
    
    createBovino(name: string, siniga: string, age: number): Promise<Bovino>;
    checkRepit(name:string):Promise<Bovino | null>
    putBovino(name:string, updateData: UpdateBovinoData):Promise<Bovino | null>
    deleteBovino(name:string):Promise<Bovino | null>
    deleteAllBovinos():Promise<{deleteCount:number} | null>
}