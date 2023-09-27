import { Request, Response } from "express";

import { CustomError } from "../models/custom-error";
import { teacherBusiness } from '../business/teacher-business';
import { File } from "../models/file-model";

export class teacherController {

    constructor(
        private teacherBusiness: teacherBusiness
    ) { }


    createAccount = async ( req: Request, res: Response ) => {

        try {

            const { name, email, password, username } = req.body;
            const data = await this.teacherBusiness.createAccount( name, email, password, username );

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
            const data = await this.teacherBusiness.login( email, password );

            res.status( 200 ).send( { token: data } );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }
    }


    getUserById = async ( req: Request, res: Response ) => {

        try {

            const token = req.headers.authorization as string;
            const data = await this.teacherBusiness.getUserById( token );

            res.status( 200 ).send( { user: data } );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }
    }


    getTeacherStudents = async ( req: Request, res: Response ) => {

        try {

            const token = req.headers.authorization as string;
            const data = await this.teacherBusiness.getTeacherStudents( token );

            res.status( 200 ).send( data );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }

    }


    updateTeacher = async ( req: Request, res: Response ) => {

        try {

            const token = req.headers.authorization as string;
            const { profile_img, name, email, job, phone_number, username } = req.body;
            await this.teacherBusiness.updateTeacher( token, profile_img, name, email, job, phone_number, username );

            res.status( 200 ).send( { message: "teacher updated successfully" } );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }
    }

    updateProfileImage = async ( req: Request, res: Response ) => {

        try {

            const profileImage = req.file as File;
            const token = req.headers.authorization as string;

            await this.teacherBusiness.updateProfileImage( token, profileImage );
            res.status( 200 ).send( { message: "profile image updated successfully" } );

        } catch ( error: any ) {
            if ( error instanceof CustomError ) {
                res.status( 404 ).send( error.message );
            } else {
                res.status( 404 ).send( error.message );
            }
        }

    }


}