
import { TeacherData } from '../../data/teacher-data';
import { CustomError } from '../../models/custom-error';
import { Authenticator } from '../../services/authenticator';
import { HashManager } from '../../services/hash-manager';
import { AuthenticationData } from '../../types/authenticator-type';


export class TeacherValidations {

    constructor(
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private teacherData: TeacherData
    ) { }

    username = async ( username: string ) => {

        if ( !username ) throw new CustomError( 404, "fill in all fields" );
        if ( username.length > 20 ) throw new CustomError( 404, "username can be a maximum of 20 characters" );
        if ( username.length < 3 ) throw new CustomError( 400, "username field must be greater than 3" );
        if ( typeof username !== "string" ) throw new CustomError( 404, "fields needs to be a string" );

        const user = await this.teacherData.getUserByUsername( username );
        if ( user ) throw new CustomError( 409, "username already exists" );

        return user;

    }

    email = async ( email: string ) => {

        if ( !email ) throw new CustomError( 404, "fill in all fields" );
        if ( !email.includes( "@" ) ) throw new CustomError( 404, "invalid email" );
        if ( typeof email !== "string" ) throw new CustomError( 404, "fields needs to be a string" );

        const user = await this.teacherData.getUserByEmail( email );
        if ( user ) throw new CustomError( 409, "email already exists" );

        return user;
    }

    password = async ( password: string ) => {

        if ( !password ) throw new CustomError( 404, "fill in all fields" );
        if ( password.length < 6 ) throw new CustomError( 404, "password must be greater than 6" );
        if ( typeof password !== "string" ) throw new CustomError( 404, "fields needs to be a string" );
        const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if ( !passwordRegex.test( password ) ) throw new CustomError( 404, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número" );
    }

    name = async ( name: string ) => {


        if ( !name ) throw new CustomError( 404, "fill in all fields" );
        if ( name.length < 3 ) throw new CustomError( 404, "name must be greater than 3" );
        if ( typeof name !== "string" ) throw new CustomError( 404, "fields needs to be a string" );
        if ( name.length > 50 ) throw new CustomError( 404, "name can be a maximum of 50 characters" );
    }

    token = async ( token: string ) => {

        const tokenData = this.authenticator.getTokenData( token ) as AuthenticationData;
        if ( !tokenData.id ) throw new CustomError( 404, "invalid token" );

        return tokenData;

    }


    updateTeacher = async ( profile_img?: string, name?: string, email?: string, job?: string, phone_number?: number, username?: string ) => {

        if ( !profile_img && !name && !email && !job && !phone_number && !username ) throw new CustomError( 404, "fill in at least one field" );

        if ( name ) await this.name( name );
        if ( email ) await this.email( email );
        if ( username ) await this.username( username );


        // if ( phone_number ) await this.phone_number( phone_number );
        // if ( profile_img ) await this.profile_img( profile_img );


    }

}