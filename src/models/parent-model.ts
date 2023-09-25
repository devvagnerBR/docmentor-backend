
enum Parent {

}
export class ParentModel {

    constructor(

        private id: string,
        private address: string,
        private phone_number1: number,
        private phone_number2?: number | undefined,
        private mother_name?: string | undefined,
        private father_name?: string | undefined,

    ) { }

    getId = () => this.id;
    getPhoneNumber1 = () => this.phone_number1;
    getPhoneNumber2 = () => this.phone_number2;
    getAddress = () => this.address;
    getMotherName = () => this.mother_name;
    getFatherName = () => this.father_name;


}