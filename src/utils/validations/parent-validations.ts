import { CustomError } from "../../models/custom-error"
import { ParentModel } from "../../models/parent-model";

export class ParentValidations {

    registerParent = async ( parent: ParentModel ) => {


        if ( !parent.getAddress() ) throw new CustomError( 400, "Address is required" );
        if ( typeof parent.getAddress() !== "string" ) throw new CustomError( 400, "Address must be a string" );

        if ( !parent.getPhoneNumber1() ) throw new CustomError( 400, "Main phone number is required" );
        if ( typeof parent.getPhoneNumber1() !== "number" ) throw new CustomError( 400, "Main phone number must be a number" );

        if ( parent.getPhoneNumber2() ) {
            if ( typeof parent.getPhoneNumber2() !== "number" ) throw new CustomError( 400, "Secondary phone number must be a number" );
            if ( typeof parent.getPhoneNumber2() !== "number" ) throw new CustomError( 400, "Secondary phone number must be a number" );
        }

        if ( parent.getMotherName() ) {
            if ( typeof parent.getMotherName() !== "string" ) throw new CustomError( 400, "Mother name must be a string" );
        }

        if ( parent.getFatherName() ) {
            if ( typeof parent.getFatherName() !== "string" ) throw new CustomError( 400, "Father name must be a string" );
        }

        if ( parent.getMotherName() && parent.getFatherName() ) {
            if ( parent.getMotherName() === parent.getFatherName() ) throw new CustomError( 400, "Mother name and father name must be different" );
        }

        if ( parent.getPhoneNumber1() === parent.getPhoneNumber2() ) throw new CustomError( 400, "Main phone number and secondary phone number must be different" );

    }

    updateParent = async ( parent: ParentModel ) => {

        
        if(!parent.getAddress() && !parent.getPhoneNumber1() && !parent.getPhoneNumber2() && !parent.getMotherName() && !parent.getFatherName()) throw new CustomError(400, "At least one field must be filled")

        if ( parent.getAddress() ) {
            if ( typeof parent.getAddress() !== "string" ) throw new CustomError( 400, "Address must be a string" );
        }

        if ( parent.getPhoneNumber1() ) {
            if ( typeof parent.getPhoneNumber1() !== "number" ) throw new CustomError( 400, "Main phone number must be a number" );
        }

        if ( parent.getPhoneNumber2() ) {
            if ( typeof parent.getPhoneNumber2() !== "number" ) throw new CustomError( 400, "Secondary phone number must be a number" );
        }

        if ( parent.getMotherName() ) {
            if ( typeof parent.getMotherName() !== "string" ) throw new CustomError( 400, "Mother name must be a string" );
        }

        if ( parent.getFatherName() ) {
            if ( typeof parent.getFatherName() !== "string" ) throw new CustomError( 400, "Father name must be a string" );
        }

        if ( parent.getMotherName() && parent.getFatherName() ) {
            if ( parent.getMotherName() === parent.getFatherName() ) throw new CustomError( 400, "Mother name and father name must be different" );
        }

    }

} 
