import { Router } from 'express';
import { userController } from '../dependencies';

const userRouter = Router();

userRouter.post('/user-active?', (req, res) => userController.getUserOnline(req, res));
userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/register', (req, res) => userController.register(req, res));
userRouter.post('/passwd-recovery', (req, res) => userController.passwdRecovery(req, res));
userRouter.post('/token/recovery-passwd', (req, res) => userController.tokenVerifiRecoveryPasswd(req, res))
userRouter.post('/new-passwd', (req, res) => userController.newPasswd(req, res))
userRouter.put('/update-data', (req, res) => userController.updateUser(req, res));
userRouter.delete('/delete/:email', (req, res) => userController.deleteUser(req, res));

export default userRouter;
