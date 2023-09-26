import { ReportBusiness } from "../business/report-business";
import { ReportController } from "../controller/report-controller";
import { ReportData } from "../data/report-data";
import { StudentData } from "../data/student-data";
import { TeacherData } from "../data/teacher-data";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hash-manager";
import { IdGenerator } from "../services/id-generator";
import { TeacherValidations } from "../utils/validations/teacher-validations";
import express from 'express';


const reportBusiness = new ReportBusiness(
    new ReportData(),
    new TeacherData(),
    new StudentData(),
    new TeacherValidations( new Authenticator, new HashManager, new TeacherData ),
    new IdGenerator()
);

const reportController: ReportController = new ReportController( reportBusiness );
export const reportRouter = express.Router();

reportRouter.post( "/report/:studentId", reportController.createReport );