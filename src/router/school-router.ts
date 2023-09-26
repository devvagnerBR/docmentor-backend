import { SchoolBusiness } from "../business/school-business";
import { SchoolController } from "../controller/school-controller";
import { SchoolData } from "../data/school-data";

import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hash-manager";
import { IdGenerator } from "../services/id-generator";
import { SchoolValidations } from "../utils/validations/school-validations";
import express from 'express';
import { TeacherValidations } from "../utils/validations/teacher-validations";
import { TeacherData } from "../data/teacher-data";


const schoolBusiness: SchoolBusiness = new SchoolBusiness(
    new SchoolData,
    new SchoolValidations( new SchoolData ),
    new IdGenerator,
    new TeacherValidations( new Authenticator, new HashManager, new TeacherData )
);

const schoolController: SchoolController = new SchoolController( schoolBusiness );
export const schoolRouter = express.Router();

schoolRouter.post( "/school", schoolController.createSchool );
