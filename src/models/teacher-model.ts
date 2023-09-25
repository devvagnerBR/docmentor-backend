
export class UserModel {

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private username: string
    ) { }

    getId = () => this.id;
    getName = () => this.name;
    getEmail = () => this.email;
    getPassword = () => this.password;
    getUsername = () => this.username;

}