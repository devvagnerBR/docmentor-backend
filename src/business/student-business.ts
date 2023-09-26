
import { CustomError } from "../models/custom-error";
import { StudentValidations } from '../utils/validations/student-validations';
import { SchoolValidations } from '../utils/validations/school-validations';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { StudentData } from "../data/student-data";
import { ServiceDays, StudentModel } from "../models/student-model";
import { IdGenerator } from '../services/id-generator';
import { TeacherData } from "../data/teacher-data";

export class StudentBusiness {

    constructor(
        private studentData: StudentData,
        private teacherValidations: TeacherValidations,
        private studentValidations: StudentValidations,
        private schoolValidations: SchoolValidations,
        private idGenerator: IdGenerator,
        private teacherData: TeacherData

    ) { }


    registerStudent = async ( student: { name: string, birthday: string, school_year: string, service_days: ServiceDays[] }, school_id: string, token: string ) => {

        try {

            const { name, birthday, school_year, service_days } = student;

            const tokenData = await this.teacherValidations.token( token );
            await this.schoolValidations.schoolId( school_id );

            await this.studentValidations.name( name );
            await this.studentValidations.birthday( birthday );
            await this.studentValidations.schoolGrade( school_year );
            await this.studentValidations.serviceDays( service_days );

            const id = this.idGenerator.generateId();

            await this.studentData.registerStudent(
                new StudentModel( id, name, birthday, school_year, service_days ),
                tokenData.id,
                school_id );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }
    }

    getStudentById = async ( studentId: string, token: string ) => {

        try {

            const tokenData = await this.teacherValidations.token( token );
            const teacher = await this.teacherData.getPrivateUserById( tokenData.id );
            if ( !teacher ) throw new CustomError( 404, "teacher not found" );

            const student = await this.studentData.getStudentById( studentId );
            if ( !student ) throw new CustomError( 404, "student not found" );
            if ( student.teacher_id !== teacher.id ) throw new CustomError( 401, "you are not allowed to access this information" );
            
            return student;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }


    }


}   