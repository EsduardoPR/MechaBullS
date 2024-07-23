export class User {
    readonly id: string;
    private username: string;
    private email: string;
    private password: string;

    constructor(id: string, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public getPublicUserData(): { id: string, username: string } {
        return {
          id: this.id,
          username: this.username
        };
    }
    public getPublicUserDataFromRecoveryPasswd() : {id:string, username:string, email:string} {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        }
    }
    public getUserOnlineData(): {id:string, username:string, email:string}{
        return {
            id:this.id,
            username: this.username,
            email: this.email
        }
    }
}
