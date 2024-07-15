import { Lpm } from './models/lpm'

export interface LpmRepository {
    createLpm(idBovino: string, lpm: number, createAt: string): Promise<Lpm>;
    getLpmAll(): Promise<Lpm[]|null>
    getLpmById(idBovino: string): Promise<Lpm | null>
    deleteLpmById(id: string): Promise<Lpm|null> 
}