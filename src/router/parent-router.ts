import { HashManager } from '../services/hash-manager';
import { Authenticator } from '../services/authenticator';
import { ParentData } from '../data/parent-data';
import { ParentBusiness } from '../business/parent-business';
import { ParentValidations } from '../utils/validations/parent-validations';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { teacherData } from '../data/teacher-data';
import express from 'express';
import { ParentController } from '../controller/parent-controller';


const parentBusiness: ParentBusiness = new ParentBusiness(
    new ParentData,
    new ParentValidations,
    new TeacherValidations(
        new Authenticator,
        new HashManager,
        new teacherData
    )
);

const parentController: ParentController = new ParentController( parentBusiness );

export const parentRouter = express.Router();

parentRouter.post( "/parent/:id", parentController.registerParent );
