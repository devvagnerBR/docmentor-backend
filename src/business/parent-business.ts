import { ParentData } from "../data/parent-data";
import { CustomError } from "../models/custom-error";
import { ParentModel } from "../models/parent-model";
import { ParentValidations } from '../utils/validations/parent-validations';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { TeacherData } from '../data/teacher-data';
import { IdGenerator } from '../services/id-generator';
import { StudentData } from "../data/student-data";

export class ParentBusiness {

    constructor(
        private parentData: ParentData,
        private parentValidations: ParentValidations,
        private teacherValidations: TeacherValidations,
        private teacherData: TeacherData,
        private idGenerator: IdGenerator,
        private studentData: StudentData
    ) { }


    registerParent = async ( phone_number1: number, phone_number2: number, address: string, mother_name: string, father_name: string, studentId: string, token: string ) => {

        try {


            const tokenData = await this.teacherValidations.token( token )
            const user = await this.teacherData.getPrivateUserById( tokenData.id );
            if ( !user ) throw new CustomError( 404, "user not found" );

            const id = this.idGenerator.generateId();

            const parent = new ParentModel( id, address, phone_number1, phone_number2, mother_name, father_name );

            const checkPhoneNumber = await this.parentData.getParentByPhoneNumber( phone_number1 );
            if ( checkPhoneNumber ) throw new CustomError( 409, "This phone number is already registered" );

            const hasAddress = await this.parentData.getParentByAddress( address );
            if ( hasAddress ) throw new CustomError( 409, "This address is already registered" );

            const student = await this.studentData.getStudentById( studentId );
            if ( !student ) throw new CustomError( 404, "Student not found" );

            const hasParents = await this.studentData.getStudentParents( studentId )
             if ( hasParents.length >= 1 ) throw new CustomError( 409, "This student already has registered parents" );
          
            await this.parentValidations.registerParent( parent );
            await this.parentData.registerParent( parent, studentId );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }
}