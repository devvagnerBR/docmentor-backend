import { SchoolData } from "../data/school-data";
import { SchoolModel } from "../models/school-model";
import { SchoolValidations } from "../utils/validations/school-validations";
import { IdGenerator } from '../services/id-generator';
import { CustomError } from "../models/custom-error";
import { TeacherValidations } from '../utils/validations/teacher-validations';

export class SchoolBusiness {


    constructor(
        private schoolData: SchoolData,
        private schoolValidations: SchoolValidations,
        private idGenerator: IdGenerator,
        private teacherValidations: TeacherValidations
    ) { }

    createSchool = async ( name: string, cep: string, token: string ) => {

        try {

            const tokenData = await this.teacherValidations.token( token );
            const id = this.idGenerator.generateId();

            await this.schoolValidations.schoolName( name );
            await this.schoolValidations.cep( cep );
            await this.schoolData.createSchool( new SchoolModel( id, name, cep ), tokenData.id );

            await this.schoolData.getSchoolByName( name );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }

}