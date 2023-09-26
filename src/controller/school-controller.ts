import { Request, Response } from "express";
import { SchoolBusiness } from "../business/school-business";

export class SchoolController {

    constructor(
        private schoolBusiness: SchoolBusiness
    ) { }

    createSchool = async ( req: Request, res: Response ) => {

        try {

            const { name, cep } = req.body;
            const token = req.headers.authorization as string;

            await this.schoolBusiness.createSchool( name, cep, token );

            res.status( 200 ).send( "School created successfully" );

        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }
    }

    getAllSchools = async ( req: Request, res: Response ) => {

        try {

            const token = req.headers.authorization as string;

            const schools = await this.schoolBusiness.getAllSchools( token );
            res.status( 200 ).send( schools );

        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }
    }

    updateSchool = async ( req: Request, res: Response ) => {

        try {

            const { name, cep } = req.body;
            const token = req.headers.authorization as string;
            const schoolId = req.params.schoolId;

            await this.schoolBusiness.updateSchool( token, schoolId, name, cep );
            res.status( 200 ).send( "School updated successfully" )

        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }
    }

    deleteSchool = async ( req: Request, res: Response ) => {
            
            try {
    
                const token = req.headers.authorization as string;
                const schoolId = req.params.schoolId;
    
                await this.schoolBusiness.deleteSchool( token, schoolId );
                res.status( 200 ).send( "School deleted successfully" )
    
            } catch ( error: any ) {
                res.status( 404 ).send( error.message );
            }
    }
}
