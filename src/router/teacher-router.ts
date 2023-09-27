import multer from "multer";
import { teacherBusiness } from "../business/teacher-business";
import { teacherController } from "../controller/teacher-controller";
import { TeacherData } from "../data/teacher-data";

import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hash-manager";
import { IdGenerator } from "../services/id-generator";
import { Storage } from "../services/storage";
import { TeacherValidations } from "../utils/validations/teacher-validations";
import express from 'express';


const userBusiness: teacherBusiness = new teacherBusiness(
    new TeacherData,
    new HashManager,
    new TeacherValidations( new Authenticator, new HashManager, new TeacherData, ),
    new IdGenerator,
    new Authenticator,
    new Storage
);

const userController: teacherController = new teacherController( userBusiness );
const upload = multer( { storage: multer.memoryStorage() } )

export const teacherRouter = express.Router();

teacherRouter.post( "/signup", userController.createAccount );
teacherRouter.post( "/login", userController.login );
teacherRouter.get( "/profile", userController.getUserById );
teacherRouter.get( "/students", userController.getTeacherStudents );
teacherRouter.put( "/edit", userController.updateTeacher );
teacherRouter.put( "/profile/image", upload.single( "file" ), userController.updateProfileImage );
teacherRouter.put( "/profile/password", userController.changePassword )