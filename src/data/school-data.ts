import { PRISMA_CLIENT } from "../database/prisma"
import { SchoolModel } from "../models/school-model"


export class SchoolData {


    createSchool = async ( school: SchoolModel, teacher_id: string ) => {

        try {

            await PRISMA_CLIENT.school.create( {
                data: {
                    id: school.getId(),
                    name: school.getName(),
                    cep: school.getCep(),
                    teachers: {
                        connect: {
                            id: teacher_id
                        }
                    }
                }
            } )

        } catch ( error: any ) {

            if ( error.code === 'P2002' ) throw new Error( 'school already registered' )
            if ( error.code === 'P2025' ) throw new Error( 'teacher not found' )

            throw new Error( error.message )
        }
    }


    getSchoolByName = async ( name: string ) => {

        try {

            const school = await PRISMA_CLIENT.school.findUnique( {
                where: {
                    name
                }
            } )

            return school;

        } catch ( error: any ) {
            throw new Error( error.message )
        }
    }


    getSchoolById = async ( id: string ) => {

        try {

            const school = await PRISMA_CLIENT.school.findUnique( {
                where: {
                    id
                }
            } )

            return school;

        } catch ( error: any ) {
            throw new Error( error.message )
        }

    }

}