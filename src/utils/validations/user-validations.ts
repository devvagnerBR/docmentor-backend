import { UserData } from '../../data/user-data';
import { CustomError } from '../../models/custom-error';
import { Authenticator } from '../../services/authenticator';
import { HashManager } from '../../services/hash-manager';


export class UserValidations {

    constructor(
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private userData: UserData
    ) { }

    username = async ( username: string ) => {

        if ( !username ) throw new CustomError( 404, "fill in all fields" );
        if ( username.length > 20 ) throw new CustomError( 404, "username can be a maximum of 20 characters" );
        if ( username.length < 3 ) throw new CustomError( 400, "username field must be greater than 3" );
        if ( typeof username !== "string" ) throw new CustomError( 404, "fields needs to be a string" );

        const user = await this.userData.getUserByUsername( username );
        if ( user ) throw new CustomError( 409, "username already exists" );

        return user;

    }

    email = async ( email: string ) => {

        if ( !email ) throw new CustomError( 404, "fill in all fields" );
        if ( !email.includes( "@" ) ) throw new CustomError( 404, "invalid email" );
        if ( typeof email !== "string" ) throw new CustomError( 404, "fields needs to be a string" );

        const user = await this.userData.getUserByEmail( email );
        if ( user ) throw new CustomError( 409, "email already exists" );

        return user;
    }

    password = async ( password: string ) => {

        if ( !password ) throw new CustomError( 404, "fill in all fields" );
        if ( password.length < 6 ) throw new CustomError( 404, "password must be greater than 6" );
        if ( typeof password !== "string" ) throw new CustomError( 404, "fields needs to be a string" );
        const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if ( !passwordRegex.test( password ) ) throw new CustomError( 404,  "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número" );
    }

    name = async ( name: string ) => {
    
    
        if ( !name ) throw new CustomError( 404, "fill in all fields" );
        if ( name.length < 3 ) throw new CustomError( 404, "name must be greater than 3" );
        if ( typeof name !== "string" ) throw new CustomError( 404, "fields needs to be a string" );
        if ( name.length > 50 ) throw new CustomError( 404, "name can be a maximum of 50 characters" );
        
    }



}