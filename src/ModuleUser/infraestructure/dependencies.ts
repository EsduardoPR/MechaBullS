import { CreateUserUseCase } from "../application/createUserUseCase";
import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { GetUserUseCase } from "../application/getUserUseCase";
import { UpdateUserUseCase } from "../application/updateUserUseCase";
import { UserController } from "./controllers/userController";
import { DbUserRepository } from "./repositories/dbUserRepository";

const dbUserRepository = new DbUserRepository();


export const getUserUseCase = new GetUserUseCase(dbUserRepository);
export const createUserUseCase = new CreateUserUseCase(dbUserRepository);
export const updateUserUseCase = new UpdateUserUseCase(dbUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(dbUserRepository);

export const userController = new UserController(
    getUserUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
);
