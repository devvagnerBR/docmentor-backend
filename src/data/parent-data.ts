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

    getParentByPhoneNumber = async ( phoneNumber: string ) => {

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




    getParentById = async ( parentId: string ) => {

        try {

            const user = await PRISMA_CLIENT.parent.findUnique( {
                where: {
                    id: parentId
                }
            } );

            return user

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    updateParent = async ( parentId: string, phone_number1?: string, phone_number2?: string, address?: string, mother_name?: string, father_name?: string ) => {

        try {

            await PRISMA_CLIENT.parent.update( {
                where: {
                    id: parentId
                },
                data: {
                    phone_number1: phone_number1 || undefined,
                    phone_number2: phone_number2 || undefined,
                    address: address || undefined,
                    mother_name: mother_name || undefined,
                    father_name: father_name || undefined,
                }
            } );


        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    getStudentParents = async ( studentId: string ) => {

        try {

            const parents = await PRISMA_CLIENT.parent.findMany( {
                where: {
                    students: {
                        some: {
                            id: studentId
                        }
                    }
                }
            } );

            return parents

        } catch ( error: any ) {
            throw new Error( error.message );
        }

    }

    getParentByStudentId = async ( studentId: string ) => {

        try {

            const parent = await PRISMA_CLIENT.parent.findFirst( {
                where: {
                    students: {
                        some: {
                            id: studentId
                        }
                    }
                }
            } );

            return parent

        } catch ( error: any ) {
            throw new Error( error.message );
        }
    }

    deleteParent = async ( parentId: string ) => {
            
            try {
    
                await PRISMA_CLIENT.parent.delete( {
                    where: {
                        id: parentId
                    }
                } );
    
            } catch ( error: any ) {
                throw new Error( error.message );
            }
    }

}