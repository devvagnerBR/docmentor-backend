import { Request, Response } from "express";
import { SchoolBusiness } from "../business/school-business";

export class SchoolController {

    constructor(
        private schoolBusiness: SchoolBusiness
    ){}

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
}