export enum ServiceDays {
    SEGUNDA_FEIRA = 'SEGUNDA_FEIRA',
    TERCA_FEIRA = 'TERCA_FEIRA',
    QUARTA_FEIRA = 'QUARTA_FEIRA',
    QUINTA_FEIRA = 'QUINTA_FEIRA',
    SEXTA_FEIRA = 'SEXTA_FEIRA',

}


export class StudentModel {

    constructor(

        private id: string | undefined,
        private name: string | undefined,
        private birthday: string | undefined,
        private school_grade: string | undefined,
        private service_days: ServiceDays[] | undefined


    ) { }

    getId = () => this.id;
    getName = () => this.name;
    getBirthday = () => this.birthday;
    getSchoolGrade = () => this.school_grade;
    getServiceDays = () => this.service_days;

}