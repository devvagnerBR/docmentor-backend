import { SchoolData } from "../data/school-data";
import { SchoolModel } from "../models/school-model";
import { SchoolValidations } from "../utils/validations/school-validations";
import { IdGenerator } from '../services/id-generator';
import { CustomError } from "../models/custom-error";
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { TeacherData } from "../data/teacher-data";

export class SchoolBusiness {


    constructor(
        private schoolData: SchoolData,
        private schoolValidations: SchoolValidations,
        private idGenerator: IdGenerator,
        private teacherValidations: TeacherValidations,
        private teacherData: TeacherData
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

    getAllSchools = async ( token: string ) => {

        try {

            const tokenData = await this.teacherValidations.token( token );
            const user = await this.teacherData.getPrivateUserById( tokenData.id );
            if ( !user ) throw new CustomError( 404, "user not found" );

            const schools = await this.schoolData.getAllSchools()
            return schools;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }
    }

    updateSchool = async ( token: string, schoolId: string, name?: string, cep?: string ) => {
            
            try {
    
                
                const tokenData = await this.teacherValidations.token( token );
                const user = await this.teacherData.getPrivateUserById( tokenData.id );
                if ( !user ) throw new CustomError( 404, "user not found" );

                if(!name && !cep) throw new CustomError( 400, "You must provide at least one field to update")
    
                const school = await this.schoolData.getSchoolById( schoolId );
                if ( !school ) throw new CustomError( 404, "school not found" );
    
                if ( name ) await this.schoolValidations.schoolName( name );
                if ( cep ) await this.schoolValidations.cep( cep );
    
                await this.schoolData.updateSchool( schoolId, name, cep );
    
            } catch ( error: any ) {
                throw new CustomError( error.statusCode, error.message );
            }
    }

}