import { Steph } from './models/steph'

export interface StephRepository {

    createSteph(idBovino: string, steph: number, createAt: string): Promise<Steph>;
    getStephAll(): Promise<Steph[]|null>
    getStephById(idBovino: string): Promise<Steph | null>
    deleteStephById(id: string): Promise<Steph|null>
} 