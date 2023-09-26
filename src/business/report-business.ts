import { ReportData } from "../data/report-data";
import { ReportModel } from "../models/report-model";
import { TeacherData } from '../data/teacher-data';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { IdGenerator } from "../services/id-generator";
import { StudentData } from "../data/student-data";

export class ReportBusiness {

    constructor(
        private reportData: ReportData,
        private teacherData: TeacherData,
        private studentData: StudentData,
        private teacherValidations: TeacherValidations,
        private idGenerator: IdGenerator
    ) { }

    createReport = async ( title: string, report: string, student_id: string, token: string ) => {

        const tokenData = await this.teacherValidations.token( token );
        const teacher = await this.teacherData.getPrivateUserById( tokenData.id );
        if ( !teacher ) throw new Error( "Teacher not found" );

        if ( !title && !report ) throw new Error( "Title and report are required" )


        const student = await this.studentData.getStudentById( student_id );
        if ( !student ) throw new Error( "Student not found" );

        const id = this.idGenerator.generateId();
        await this.reportData.createReport( new ReportModel( title, report, id ), student_id );

    }

}