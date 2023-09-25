import { UserBusiness } from "../business/user-business";
import { UserController } from "../controller/user-controller";
import { UserData } from "../data/user-data";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hash-manager";
import { IdGenerator } from "../services/id-generator";
import { UserValidations } from "../utils/validations/user-validations";
import express from 'express';


const userBusiness: UserBusiness = new UserBusiness(
    new UserData,
    new HashManager,
    new UserValidations( new Authenticator, new HashManager, new UserData ),
    new IdGenerator,
    new Authenticator
);

const userController: UserController = new UserController( userBusiness );
export const userRouter = express.Router();

userRouter.post( "/signup", userController.createAccount );
userRouter.post( "/login", userController.login );
