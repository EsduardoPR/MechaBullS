import { CreateDiviceUseCase } from "../application/useCase/createDiviceUseCase";
import { GetsDiviceUseCase } from "../application/useCase/getsDiviceUseCase";
import { UpdateDiviceUseCase } from "../application/useCase/updateDiviceUseCase";
import { DiviceController } from "./controller/diviceController";
import { DbDiviceRepository } from "./repositories/dbDiviceRepository";

// Repositorios
const dbDiviceRepository = new DbDiviceRepository();

// Casos de uso
const createDiviceUseCase = new CreateDiviceUseCase(dbDiviceRepository);
const getDiviceUseCase = new GetsDiviceUseCase(dbDiviceRepository);
const putsDiviceUseCase = new UpdateDiviceUseCase(dbDiviceRepository);
// const deletsBovinoUseCase = new DeletsBovinoUseCase(dbBovinoRepository);

// Controladores
export const diviceController = new DiviceController(
    createDiviceUseCase,
    getDiviceUseCase,
    putsDiviceUseCase,
    // deletsBovinoUseCase
);