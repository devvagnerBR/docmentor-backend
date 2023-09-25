import { ServiceDays } from "@prisma/client";
import { PRISMA_CLIENT } from "../database/prisma";
import { UserModel } from "../models/teacher-model";

export class teacherData {

    createAccount = async ( user: UserModel ) => {

        try {

            await PRISMA_CLIENT.teacher.create( {
                data: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    username: user.getUsername(),
                    password: user.getPassword(),
                    // schools: {
                    //     connect: {
                    //         id: process.env.DEFAULT_SCHOOL_ID
                    //     }
                    // }

                }
            } );

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }


    getUserByUsername = async ( username: string ) => {

        try {

            const user = await PRISMA_CLIENT.teacher.findUnique( {
                where: {
                    username
                }
            } );

            return user;

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getUserByEmail = async ( email: string ) => {

        try {

            const user = await PRISMA_CLIENT.teacher.findUnique( {
                where: {
                    email
                }
            } );

            return user;

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }


    getPrivateUserById = async ( id: string ) => {

        try {

            const user = await PRISMA_CLIENT.teacher.findUnique( {
                where: {
                    id
                }
            } );

            return user

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }


    getPublicUserById = async ( id: string ) => {

        try {

            const user = await PRISMA_CLIENT.teacher.findUnique( {
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    schools: true,
                    profile_img: true,
                    job: true,
                    phone_number: true,
                    created_at: true,
                    // school_id: true,


                }
            } );

            return user

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getTeacherStudents = async ( token: string ) => {

        try {

            const students = await PRISMA_CLIENT.teacher.findMany( {
                where: {
                    id: token
                },
                select: {
                    students: true,
                }
            } )

            return students[0].students;

        } catch ( error: any ) {
            throw new Error( error.message );
        }

    }


    updateTeacher = async ( token: string, profile_img?: string, name?: string, email?: string, job?: string, phone_number?: number, username?: string ) => {

        try {

            await PRISMA_CLIENT.teacher.update( {
                where: {
                    id: token
                },

                data: {
                    email: email || undefined,
                    name: name || undefined,
                    job: job || undefined,
                    phone_number: phone_number || undefined,
                    username: username || undefined,
                    profile_img: profile_img || undefined,
                }
            } );

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

}