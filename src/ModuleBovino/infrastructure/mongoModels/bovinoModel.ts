import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz que describe la estructura del documento de Bovino en Mongoose
export interface BovinoDocument extends Document {
    name: string;
    siniga: string;
    age: number;
    lpm: number;
    averageSteps: number;
    location: number;
    userId:string;
}

// Define el esquema (Schema) de Mongoose para Bovino utilizando la interfaz BovinoDocument
const BovinoSchema: Schema<BovinoDocument> = new Schema({
    name: { type: String, required: true },
    siniga: { type: String, required: true },
    age: { type: Number, required: true },
    lpm: { type: Number, default: 0 },
    averageSteps: { type: Number, default: 0 },
    location: { type: Number, default: 0 },
    userId:{ type: String, required:true}
});

// Crea y exporta el modelo de Mongoose basado en el esquema y la interfaz definidos
export const Bovino = mongoose.model<BovinoDocument>('Bovino', BovinoSchema);
