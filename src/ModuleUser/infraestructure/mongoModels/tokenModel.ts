import mongoose, { Schema, Document } from 'mongoose';

interface IToken extends Document {
    token: string;
    userId: string;
    valid: boolean;
    createdAt: Date;
    expiresAt: Date;
}

const tokenSchema: Schema = new Schema({
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    valid: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

export const Token = mongoose.model<IToken>('Token', tokenSchema);
