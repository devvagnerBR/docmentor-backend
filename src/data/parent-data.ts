import { PRISMA_CLIENT } from "../database/prisma";
import { ParentModel } from "../models/parent-model";

export class ParentData {


    registerParent = async ( parent: ParentModel, studentId: string ) => {


        try {

            await PRISMA_CLIENT.parent.create( {

                data: {
                    id: parent.getId(),
                    phone_number1: parent.getPhoneNumber1(),
                    phone_number2: parent.getPhoneNumber2(),
                    address: parent.getAddress(),
                    mother_name: parent.getMotherName(),
                    father_name: parent.getFatherName(),
                    students: {
                        connect: {
                            id: studentId
                        }
                    }
                }
            } );


        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getParentByPhoneNumber = async ( phoneNumber: number ) => {

        try {

            const user = await PRISMA_CLIENT.parent.findUnique( {
                where: {
                    phone_number1: phoneNumber, 
                }
            } );

            return user


        } catch ( error: any ) {
            throw new Error( error.message );
        }

    }

    getParentByAddress = async ( address: string ) => {

        try {

            const user = await PRISMA_CLIENT.parent.findUnique( {
                where: {
                    address: address
                }
            } );

            return user

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }



}