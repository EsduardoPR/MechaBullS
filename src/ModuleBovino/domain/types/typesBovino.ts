import { Bovino } from "../models/bovino";

export type UpdateBovinoData = Partial<Omit<Bovino, 'id'>>;
