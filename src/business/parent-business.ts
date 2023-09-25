
import { ParentData } from "../data/parent-data";
import { CustomError } from "../models/custom-error";
import { ParentModel } from "../models/parent-model";
import { ParentValidations } from '../utils/validations/parent-validations';
import { Authenticator } from '../services/authenticator';
import { TeacherValidations } from '../utils/validations/teacher-validations';

export class ParentBusiness {

    constructor(
        private parentData: ParentData,
        private parentValidations: ParentValidations,
        private teacherValidations: TeacherValidations,
    ) { }


    registerParent = async ( parent: ParentModel, studentId: string, token: string ) => {

        try {

            const tokenData = this.teacherValidations.token( token )

            await this.parentValidations.registerParent( parent );
            await this.parentData.registerParent( parent, studentId );


        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }
}