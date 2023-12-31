
import { TeacherData } from '../data/teacher-data';
import { CustomError } from '../models/custom-error';
import { File } from '../models/file-model';
import { UserModel } from '../models/teacher-model';
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hash-manager';
import { IdGenerator } from '../services/id-generator';
import { Storage } from '../services/storage';
import { TeacherValidations } from '../utils/validations/teacher-validations';
import { storage } from '../database/firestore';


export class teacherBusiness {

    constructor(
        private teacherData: TeacherData,
        private hashManager: HashManager,
        private teacherValidations: TeacherValidations,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private storage: Storage
    ) { }

    createAccount = async ( name: string, email: string, password: string, username: string ) => {

        try {


            await this.teacherValidations.username( username );
            await this.teacherValidations.email( email );
            await this.teacherValidations.password( password );
            await this.teacherValidations.name( name );

            const passwordAsHash = await this.hashManager.createHash( password );
            const id = this.idGenerator.generateId();

            await this.teacherData.createAccount( new UserModel( id, name, email, passwordAsHash, username ) );
            const token: string = this.authenticator.generateToken( { id } );

            return token

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }

    login = async ( email: string, password: string ) => {

        try {

            if ( !email || !password ) throw new CustomError( 404, "fill in all fields" );
            if ( !email.includes( "@" ) ) throw new CustomError( 404, "invalid email" );

            const user = await this.teacherData.getUserByEmail( email );
            if ( !user ) throw new CustomError( 404, "user not found" );

            const passwordIsCorrect = await this.hashManager.compareHash( password, user.password );
            if ( !passwordIsCorrect ) throw new CustomError( 404, "invalid password" );

            const token: string = this.authenticator.generateToken( { id: user.id } );
            return token;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }

    getUserById = async ( token: string ) => {


        try {

            const tokenData = this.authenticator.getTokenData( token );

            const user = await this.teacherData.getPublicUserById( tokenData.id );
            if ( !user ) throw new CustomError( 404, "user not found" );

            return user;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }
    }

    getTeacherStudents = async ( token: string ) => {

        try {

            const tokenData = await this.teacherValidations.token( token );
            const students = await this.teacherData.getStudents( tokenData.id );

            return students;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }

    updateTeacher = async ( token: string, profile_img?: string, name?: string, email?: string, job?: string, phone_number?: string, username?: string ) => {

        try {

            const tokenData = await this.teacherValidations.token( token );
            const user = await this.teacherData.getPrivateUserById( tokenData.id );

            if ( !user ) throw new CustomError( 404, "user not found" );

            await this.teacherValidations.updateTeacher( profile_img, name, email, job, phone_number, username );
            await this.teacherData.updateTeacher( tokenData.id, profile_img, name, email, job, phone_number, username );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }

    updateProfileImage = async ( token: string, profile_img: File ) => {

        try {


            const tokenData = await this.teacherValidations.token( token );
            await this.teacherValidations.teacher( tokenData.id );
            await this.teacherValidations.profileImage( profile_img );

            const URL = await this.storage.createImageUrl( profile_img );
            await this.teacherValidations.URLImage( URL );
            await this.teacherData.updateProfileImage( tokenData.id, URL );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }
    }

    changePassword = async ( token: string, old_password: string, new_password: string ) => {

        try {

            if(!old_password || !new_password) throw new CustomError( 404, "fill in all fields" );

            const tokenData = await this.teacherValidations.token( token );
            const user = await this.teacherValidations.teacher( tokenData.id );

            const passwordIsCorrect = await this.hashManager.compareHash( old_password, user.password );
            if ( !passwordIsCorrect ) throw new CustomError( 404, "invalid password" );
            if(old_password === new_password) throw new CustomError( 404, "new password can't be the same as the old one" );

            await this.teacherValidations.password( new_password );
            const passwordAsHash = await this.hashManager.createHash( new_password );
            await this.teacherData.changePassword( tokenData.id, passwordAsHash );

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }


}