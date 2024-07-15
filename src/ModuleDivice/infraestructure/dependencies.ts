import { CreateDiviceUseCase } from "../application/useCase/createDiviceUseCase";
import { DiviceController } from "./controller/diviceController";
import { DbDiviceRepository } from "./repositories/dbDiviceRepository";

// Repositorios
const dbDiviceRepository = new DbDiviceRepository();

// Casos de uso
const createDiviceUseCase = new CreateDiviceUseCase(dbDiviceRepository);
// const getBovinoUseCase = new GetsBovinoUseCase(dbBovinoRepository);
// const putsBovinoUseCase = new PutsBovinoUseCase(dbBovinoRepository);
// const deletsBovinoUseCase = new DeletsBovinoUseCase(dbBovinoRepository);

// Controladores
export const diviceController = new DiviceController(
    createDiviceUseCase,
    // getDiviceUseCase,
    // putsBovinoUseCase,
    // deletsBovinoUseCase
);