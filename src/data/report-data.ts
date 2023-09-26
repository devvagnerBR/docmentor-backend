import { PRISMA_CLIENT } from "../database/prisma";
import { ReportModel } from "../models/report-model";

export class ReportData {


    createReport = async ( report: ReportModel, student_id: string ) => {

        await PRISMA_CLIENT.report.create( {
            data: {
                id: report.getId()!,
                title: report.getTitle(),
                report: report.getReport(),
                student_id
            },
        } )

    }

}