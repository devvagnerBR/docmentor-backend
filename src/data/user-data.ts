import { PRISMA_CLIENT } from "../database/prisma";
import { UserModel } from "../models/user-model";

export class UserData {

    createAccount = async ( user: UserModel ) => {

        try {

            await PRISMA_CLIENT.teacher.create( {
                data: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    username: user.getUsername(),
                    password: user.getPassword()
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

}