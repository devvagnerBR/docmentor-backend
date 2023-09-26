import { Request, Response } from "express";
import { CustomError } from "../models/custom-error";
import { StudentBusiness } from "../business/student-business";

export class StudentController {


    constructor(
        private studentBusiness: StudentBusiness
    ) { }

    registerStudent = async ( req: Request, res: Response ) => {


        try {

            const { name, birthday, school_year, service_days } = req.body;
            const { school_id } = req.params;

            const token = req.headers.authorization as string;

            await this.studentBusiness.registerStudent( { name, birthday, school_year, service_days }, school_id, token );
            res.status( 200 ).send( "student successfully registered" );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }
    }

    getStudentById = async ( req: Request, res: Response ) => {

        try {

            const { studentId } = req.params;
            const token = req.headers.authorization as string;

            const student = await this.studentBusiness.getStudentById( studentId, token );
            res.status( 200 ).send( student );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }

    }



}