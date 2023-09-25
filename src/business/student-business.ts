
import { CustomError } from "../models/custom-error";
import { StudentValidations } from '../utils/validations/student-validations';
import { SchoolValidations } from '../utils/validations/school-validations';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { StudentData } from "../data/student-data";
import { ServiceDays, StudentModel } from "../models/student-model";
import { IdGenerator } from '../services/id-generator';

export class StudentBusiness {

    constructor(
        private studentData: StudentData,
        private teacherValidations: TeacherValidations,
        private studentValidations: StudentValidations,
        private schoolValidations: SchoolValidations,
        private idGenerator: IdGenerator

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



}   