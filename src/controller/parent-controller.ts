import { Request, Response } from "express";
import { ParentBusiness } from "../business/parent-business";
import { ParentModel } from "../models/parent-model";


export class ParentController {

    constructor(
        private parentBusiness: ParentBusiness
    ) { }

    registerParent = async ( req: Request, res: Response ) => {

        try {

            const { phone_number1, phone_number2, address, mother_name, father_name } = req.body;
            const token = req.headers.authorization as string;
            const studentId = req.params.id;

            await this.parentBusiness.registerParent(  phone_number1, phone_number2, address, mother_name, father_name , studentId, token );
            res.status( 200 ).send( "Parent registered successfully" )


        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }

    }



}