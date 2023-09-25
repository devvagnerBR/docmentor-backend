import { Request, Response } from "express";
import { UserBusiness } from "../business/user-business";
import { CustomError } from "../models/custom-error";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }


    createAccount = async ( req: Request, res: Response ) => {

        try {

            const { name, email, password, username } = req.body;
            const data = await this.userBusiness.createAccount( name, email, password, username );

            res.status( 200 ).send( { token: data } );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }

    }

    login = async ( req: Request, res: Response ) => {
    
        try {
    
            const { email, password } = req.body;
            const data = await this.userBusiness.login( email, password );

            res.status( 200 ).send( { token: data } );
    
        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }
    }


}