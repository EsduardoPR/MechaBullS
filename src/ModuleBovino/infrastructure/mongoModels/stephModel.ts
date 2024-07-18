import { Schema, model, Document } from "mongoose";

interface StephDocument extends Document {
    idBovino: string;
    steph: number;
    createAt: string;
}

const stephSchema = new Schema<StephDocument>({
    idBovino: { type: String, required: true },
    steph: { type: Number, required: true },
    createAt: { type: String, required: true },
});

export const Steph = model<StephDocument>("Steph", stephSchema);
