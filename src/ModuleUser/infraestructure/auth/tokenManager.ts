import jwt from 'jsonwebtoken';

import { Token as tokenModel } from '../mongoModels/tokenModel';
import { currentSecretKey } from './secure/claves';
import { sendEmails } from '../emails/emailService';


const expires = {
    expiresIn: '7d'
};
const expiresRecoveryPasswd = {
    expiresIn: '15m'
}

export async function generarToken(id:string, username:string, passwdRecovery:string = '', email:string=''): Promise<string> {
    try {
        await esperaActualizacionSecretKey();
        if(passwdRecovery === 'true' && email){
            const payload = {
                userId: id,
                username: username,
                email:email,
                permission: 'recovery-passwd'
            }
            const token = jwt.sign(payload, currentSecretKey, expiresRecoveryPasswd);
            const expiresAt = new Date(Date.now() + 900000);
            const newToken = new tokenModel({ token, userId:id, expiresAt });
            await newToken.save();
            sendEmails(email, token);
            return token;
        } else {
            const payload = {
                userId: id,
                username: username,
                permission: 'client'
            };
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const token = jwt.sign(payload, currentSecretKey, expires);
            const newToken = new tokenModel({ token, userId:id, expiresAt });
            await newToken.save();
            return token
        }
    }  catch (error) {
        console.error('Error al guardar el token en la base de datos:', error);
        throw error; // Asegura que el error sea propagado hacia arriba para su manejo adecuado
    }

}
async function esperaActualizacionSecretKey(): Promise<void> {
    return new Promise<void>((resolve) => {
        const intervalo = setInterval(() => {
            if (currentSecretKey !== '') {
                clearInterval(intervalo);
                resolve();
            }
        }, 100); 
    });
}

export async function verifyToken(token: string):Promise <any|null> {
    try {
        const decoded = jwt.verify(token, currentSecretKey);
        const storedToken = await tokenModel.findOne({ token, valid: true }).exec();
        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw new Error('token-invalid');
        }
        return decoded;
    } catch (error) {
        throw new Error('token-invalid');
    }
}

export async function invalidateToken(token: string): Promise<void>{
    try {
        await tokenModel.findOneAndUpdate({ token }, { valid: false }).exec();
    } catch (error) {
        console.log('Error al invalidar el token', error);
        throw new Error('error-invalidating-token');
    }
}
