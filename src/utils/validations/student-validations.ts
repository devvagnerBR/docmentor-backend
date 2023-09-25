import { ServiceDays } from '@prisma/client';
import { StudentData } from '../../data/student-data';
import { CustomError } from '../../models/custom-error';
export class StudentValidations {

    constructor(
        private studentData: StudentData
    ) { }

    name = async ( name: string ) => {

        if ( !name ) throw new CustomError( 406, "Name is required" );
        if ( name.length < 3 ) throw new CustomError( 406, "Name must be at least 3 characters" );
        if ( name.length > 50 ) throw new CustomError( 406, "Name must be a maximum of 50 characters" );
        if ( typeof name !== "string" ) throw new CustomError( 406, "Name must be a string" );

        const student = await this.studentData.getStudentByName( name );
        if ( student ) throw new CustomError( 409, "Student already exists" );

        return student;

    }

    birthday = async ( birthday: string ) => {

        if ( !birthday ) throw new CustomError( 406, "Birthday is required" );
        if ( typeof birthday !== "string" ) throw new CustomError( 406, "Birthday must be a string" );

    }

    schoolGrade = async ( school_grade: string ) => {

        if ( !school_grade ) throw new CustomError( 406, "School grade is required" );

    }

    serviceDays = async ( service_days: ServiceDays[] ) => {

        if ( !service_days ) throw new CustomError( 406, "Service days is required" );
        if ( service_days.length < 1 ) throw new CustomError( 406, "Service days must be at least 1" );
    }

    

}