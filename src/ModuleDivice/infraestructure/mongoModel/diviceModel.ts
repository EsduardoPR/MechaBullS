import mongoose, { Schema, Document } from 'mongoose';

export interface DiviceDocument extends Document {
    nametag: string;
    idUser: string;
    idBovino: string;
}

const DiviceSchema: Schema<DiviceDocument> = new Schema({
    nametag: { type: String, required: true },
    idUser: { type: String, required: true },
    idBovino: { type: String, required: true },
});

// Crea y exporta el modelo de Mongoose basado en el esquema y la interfaz definidos
export const Divice = mongoose.model<DiviceDocument>('Divice', DiviceSchema);
