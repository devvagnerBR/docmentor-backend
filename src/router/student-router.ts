import { StudentBusiness } from '../business/student-business';
import { StudentController } from '../controller/student-controller';
import { SchoolData } from '../data/school-data';
import { StudentData } from '../data/student-data';
import { TeacherData } from '../data/teacher-data';
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hash-manager';
import { IdGenerator } from '../services/id-generator';
import { SchoolValidations } from '../utils/validations/school-validations';
import { StudentValidations } from '../utils/validations/student-validations';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import express from 'express';



const studentBusiness: StudentBusiness = new StudentBusiness(
    new StudentData,
    new TeacherValidations( new Authenticator, new HashManager, new TeacherData ),
    new StudentValidations( new StudentData ),
    new SchoolValidations( new SchoolData ),
    new IdGenerator,
    new TeacherData
);

const studentController: StudentController = new StudentController( studentBusiness );

export const studentRouter = express.Router();

studentRouter.post( "/register/:school_id", studentController.registerStudent );
studentRouter.get( "/student/:studentId", studentController.getStudentById );
studentRouter.put( "/update/:studentId", studentController.updateStudent );
studentRouter.delete( "/student/:studentId", studentController.deleteStudent );