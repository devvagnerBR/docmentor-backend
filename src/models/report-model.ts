export class ReportModel {

    constructor(
        private title: string,
        private report: string,
        private id?: string

    ){}

    getId = () => this.id;
    getTitle = () => this.title;
    getReport = () => this.report;

}