export class SchoolModel {

    constructor(
        private id: string,
        private name: string,
        private cep: string
    ) { }

    getId = () => this.id;
    getName = () => this.name;
    getCep = () => this.cep;

}