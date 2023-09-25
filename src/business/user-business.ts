import { UserData } from '../data/user-data';
import { CustomError } from '../models/custom-error';
import { UserModel } from '../models/user-model';
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hash-manager';
import { IdGenerator } from '../services/id-generator';
import { UserValidations } from '../utils/validations/user-validations';


export class UserBusiness {

    constructor(
        private userData: UserData,
        private hashManager: HashManager,
        private userValidations: UserValidations,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    createAccount = async ( name: string, email: string, password: string, username: string ) => {

        try {


            await this.userValidations.username( username );
            await this.userValidations.email( email );
            await this.userValidations.password( password );
            await this.userValidations.name( name );

            const passwordAsHash = await this.hashManager.createHash( password );
            const id = this.idGenerator.generateId();

            await this.userData.createAccount( new UserModel( id, name, email, passwordAsHash, username ) );
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

            const user = await this.userData.getUserByEmail( email );
            if ( !user ) throw new CustomError( 404, "user not found" );

            const passwordIsCorrect = await this.hashManager.compareHash( password, user.password );
            if ( !passwordIsCorrect ) throw new CustomError( 404, "invalid password" );

            const token: string = this.authenticator.generateToken( { id: user.id } );
            return token;

        } catch ( error: any ) {
            throw new CustomError( error.statusCode, error.message );
        }

    }


}