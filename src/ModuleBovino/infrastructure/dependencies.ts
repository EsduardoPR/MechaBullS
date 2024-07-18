import { CreateBovinoUseCase } from "../application/useCase/createBovinoUseCase";
import { DeletsBovinoUseCase } from "../application/useCase/deletsBovinoUseCase";
import { GetsBovinoUseCase } from "../application/useCase/getsBovinoUseCase";
import { PutsBovinoUseCase } from "../application/useCase/putsBovinoUseCase";
import { BovinoController } from "./controllers/bovinoController";
import { DbBovinoRepository } from "./repositories/dbBovinoRepository";

import { CreateLpmUseCase } from "../application/lpmUseCase/createLpmUseCase";
import { DeletsLpmUseCase } from "../application/lpmUseCase/deleteLpmUseCase";
import { GetLpmUseCase } from "../application/lpmUseCase/getLpmUseCase";
import { LpmController } from "./controllers/lpmController";
import { DbLpmRepository } from "./repositories/dbLpmRepository";

import { CreateStephUseCase } from "../application/stephUseCase/createStephUseCase";
import { GetStephUseCase } from "../application/stephUseCase/getsStephUseCase";
import { DeletsStephUseCase } from "../application/stephUseCase/deletsStephUseCase";
import { StephController } from "./controllers/stephController";
import { DbStephRepository } from "./repositories/dbStephRepository";

import { CreateLocationUseCase } from "../application/locationUseCase/createLocationUseCase";
import { GetLocationUseCase } from "../application/locationUseCase/getsLocationUseCase";
import { DeletsLocationUseCase } from "../application/locationUseCase/deletsLocationUseCae";
import { LocationController } from "./controllers/locationController";
import { DbLocationRepository } from "./repositories/dbLocationRepository";


// Repositorios
const dbBovinoRepository = new DbBovinoRepository();
const dbLpmRepository = new DbLpmRepository();
const dbStephRepository = new DbStephRepository();
const dbLocationRepository = new DbLocationRepository();

// Casos de uso
const getBovinoUseCase = new GetsBovinoUseCase(dbBovinoRepository);
const createBovinoUseCase = new CreateBovinoUseCase(dbBovinoRepository);
const putsBovinoUseCase = new PutsBovinoUseCase(dbBovinoRepository);
const deletsBovinoUseCase = new DeletsBovinoUseCase(dbBovinoRepository);

const getLpmUseCase = new GetLpmUseCase(dbLpmRepository);
const deleteLpmUseCase = new DeletsLpmUseCase(dbLpmRepository);
const createLpmUseCase = new CreateLpmUseCase(dbLpmRepository);

const createStephUseCase = new CreateStephUseCase(dbStephRepository);
const getsStephUseCase = new GetStephUseCase(dbStephRepository);
const deletsStephUseCase = new DeletsStephUseCase(dbStephRepository);

const createLocationUseCase = new CreateLocationUseCase(dbLocationRepository);
const getsLocationUseCase = new GetLocationUseCase(dbLocationRepository);
const deleteLocationUseCase = new DeletsLocationUseCase(dbLocationRepository);

// Controladores
export const bovinoController = new BovinoController(
    getBovinoUseCase,
    createBovinoUseCase,
    putsBovinoUseCase,
    deletsBovinoUseCase
);

export const lpmController = new LpmController(
    getLpmUseCase,
    deleteLpmUseCase,
    createLpmUseCase
);

export const stephController = new StephController(
    createStephUseCase,
    getsStephUseCase,
    deletsStephUseCase
);

export const locationController = new LocationController(
    createLocationUseCase,
    getsLocationUseCase,
    deleteLocationUseCase
);