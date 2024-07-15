import { Schema, model, Document } from "mongoose";

interface LocationDocument extends Document {
    idBovino: string;
    location: string;
    createAt: string;
}

const locationSchema = new Schema<LocationDocument>({
    idBovino: { type: String, required: true },
    location: { type: String, required: true },
    createAt: { type: String, required: true },
});

export const Location = model<LocationDocument>("Location", locationSchema);
