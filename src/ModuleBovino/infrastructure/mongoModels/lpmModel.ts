import { Schema, model, Document } from "mongoose";

interface LpmDocument extends Document {
    idBovino: string;
    lpm: number;
    createAt: string;
}

const lpmSchema = new Schema<LpmDocument>({
    idBovino: { type: String, required: true },
    lpm: { type: Number, required: true },
    createAt: { type: String, required: true },
});

export const Lpm = model<LpmDocument>("Lpm", lpmSchema);
