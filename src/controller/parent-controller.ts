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

            await this.parentBusiness.registerParent( phone_number1, phone_number2, address, mother_name, father_name, studentId, token );
            res.status( 200 ).send( "Parent registered successfully" )


        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }

    }


    updateParent = async ( req: Request, res: Response ) => {

        try {

            const { phone_number1, phone_number2, address, mother_name, father_name } = req.body;
            const token = req.headers.authorization as string;
            const parentId = req.params.parentId;

            await this.parentBusiness.updateParent( token, parentId, phone_number1, phone_number2, address, mother_name, father_name );
            res.status( 200 ).send( "Parent updated successfully" )

        } catch ( error: any ) {
            res.status( 404 ).send( error.message );
        }
    }


}