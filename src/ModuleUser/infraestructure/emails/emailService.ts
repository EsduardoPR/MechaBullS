import nodemailer from 'nodemailer'

export async function sendEmails(email:string, token:string) {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth : {
            user: 'mechabullempress@gmail.com',
            pass: 'wrmc mcvc vtdm brfq'
        }
    }

    const emailBody = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                        color: #333;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #444242;
                    }
                    p {
                        margin: 10px 0;
                    }
                    a.button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 20px 0;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #1a73e8;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    a.button:hover {
                        background-color: #155cb0;
                    }
                    a.button:active {
                        background-color: #4d85c9;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Restablecer tu contraseña</h1>
                    <p>Hola,</p>
                    <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para establecer una nueva contraseña:</p>
                    <p><a href="http://localhost:5173/new-contra?token=${token}"" class="button">Restablecer mi contraseña</a></p>
                    <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo electrónico. Tu contraseña actual no se verá afectada.</p>
                    <p>Saludos,</p>
                    <p>El equipo de Soporte - MechaBull.</p>
                </div>
            </body>
            </html>
        `;

    const mensaje = {
        from: 'mechabullempress@gmail.com',
        to: email,
        subject: "Instrucciones para restablecer tu contraseña - MechaBull",
        html: emailBody,
        
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje)
    
}