export enum ServiceDays {
    SEGUNDA_FEIRA = 'SEGUNDA_FEIRA',
    TERCA_FEIRA = 'TERCA_FEIRA',
    QUARTA_FEIRA = 'QUARTA_FEIRA',
    QUINTA_FEIRA = 'QUINTA_FEIRA',
    SEXTA_FEIRA = 'SEXTA_FEIRA',

}


export class StudentModel {

    constructor(

        private id: string,
        private name: string,
        private birthday: string,
        private school_grade: string,
        private service_days: ServiceDays[]


    ) { }

    getId = () => this.id;
    getName = () => this.name;
    getBirthday = () => this.birthday;
    getSchoolGrade = () => this.school_grade;
    getServiceDays = () => this.service_days;

}