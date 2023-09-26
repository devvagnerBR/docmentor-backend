import { Request, Response } from "express";
import { ReportBusiness } from "../business/report-business";

export class ReportController {

    constructor(
        private reportBusiness: ReportBusiness
    ) { }

    createReport = async ( req: Request, res: Response ) => {

        try {

            const { title, report } = req.body;
            const student_id = req.params.studentId;
            const token = req.headers.authorization as string;

            await this.reportBusiness.createReport( title, report, student_id, token );

            res.status( 201 ).send( { message: "Report created successfully" } );

        } catch ( error: any ) {

            res.status( error.statusCode || 400 ).send( { error: error.message } );

        }
    }
}