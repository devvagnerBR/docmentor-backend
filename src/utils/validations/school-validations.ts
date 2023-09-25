import { SchoolData } from "../../data/school-data"
import { CustomError } from "../../models/custom-error"

export class SchoolValidations {

    constructor(
        private schoolData: SchoolData
    ) { }


    schoolName = async ( name: string ) => {

        if ( !name ) throw new Error( "School name is required" );
        if ( name.length < 3 ) throw new Error( "Name must be at least 3 characters" );
        if ( name.length > 50 ) throw new Error( "Name must be a maximum of 50 characters" );
        if ( typeof name !== "string" ) throw new Error( "Name must be a string" );

        const school = await this.schoolData.getSchoolByName( name );
        if ( school ) throw new CustomError( 409, "School already exists" );

        return school;

    }


    cep = async ( cep: string ) => {

        if ( !cep ) throw new Error( "Cep is required" );

        if ( cep.includes( "-" ) ) {
            const removeMask = cep.replace( "-", "" );
            return removeMask
        }
        if ( cep.length > 9 ) throw new Error( "Invalid cep" );
        if ( typeof cep !== "string" ) throw new Error( "Cep must be a string" );

    }


    schoolId = async ( id: string ) => {

        if ( !id ) throw new Error( "School id is required" );
        const school = await this.schoolData.getSchoolById( id );

        if ( !school ) throw new CustomError( 404, "School not found" );
        return school;

    }

} 
