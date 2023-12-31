
import { TeacherData } from '../../data/teacher-data';
import { CustomError } from '../../models/custom-error';
import { File } from '../../models/file-model';
import { UserModel } from '../../models/teacher-model';
import { Authenticator } from '../../services/authenticator';
import { HashManager } from '../../services/hash-manager';
import { AuthenticationData } from '../../types/authenticator-type';


export class TeacherValidations {

    constructor(
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private teacherData: TeacherData,

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

    phoneNumber = async ( phone_number: string ) => {

        if ( !phone_number ) throw new CustomError( 404, "fill in all fields" );
        const user = await this.teacherData.getTeacherByPhoneNumber( phone_number );
        if ( user ) throw new CustomError( 409, "phone number already exists" );

    }

    updateTeacher = async ( profile_img?: string, name?: string, email?: string, job?: string, phone_number?: string, username?: string ) => {

        if ( !profile_img && !name && !email && !job && !phone_number && !username ) throw new CustomError( 404, "fill in at least one field" );

        if ( name ) await this.name( name );
        if ( email ) await this.email( email );
        if ( username ) await this.username( username );
        if ( phone_number ) await this.phoneNumber( phone_number )

    }

    teacher = async ( token: string ) => {

        const user = await this.teacherData.getPrivateUserById( token );
        if ( !user ) throw new CustomError( 404, "user not found" );

        return user;
    }

    profileImage = async ( profile_img: File ) => {

        if ( !profile_img ) throw new CustomError( 404, "fill in all fields" );
        if ( !profile_img.mimetype.includes( "image" ) ) throw new CustomError( 404, "invalid file" );
        if ( profile_img.size > 5000000 ) throw new CustomError( 404, "image must be less than 5MB" );
        if ( typeof profile_img !== "object" ) throw new CustomError( 404, "fields needs to be a object" );
        if ( !profile_img.buffer ) throw new CustomError( 404, "invalid file" );
        if ( !profile_img.originalname ) throw new CustomError( 404, "invalid file" );
        if ( !profile_img.encoding ) throw new CustomError( 404, "invalid file" );
        if ( !profile_img.mimetype ) throw new CustomError( 404, "invalid file" );
        if ( !profile_img.size ) throw new CustomError( 404, "invalid file" )

    }

    URLImage = async ( url: string ) => {

        if ( !url ) throw new CustomError( 404, "fill in all fields" );
        if ( typeof url !== "string" ) throw new CustomError( 404, "fields needs to be a string" );
        if ( !url.includes( "https://" ) ) throw new CustomError( 404, "invalid url" );

    }

}