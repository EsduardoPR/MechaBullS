import { UserRepository } from '../domain/userRepository';
export class GetUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async getUserByUsername(username: string, password:string): Promise<{ id: string, username: string } | null> {
        const getUser = await this.userRepository.getUserByUsername(username, password);
        if (!getUser) {
            throw new Error("error-find-or-password");
        } 
        return getUser.getPublicUserData(); 
    }
    async getUserByEmail(email:string):Promise<{id:string, username:string, email:string} | null> {
        const getUser = await this.userRepository.getUserByEmail(email);
        if (!getUser) {
            throw new Error("error-search-user");
        }
        return getUser.getPublicUserDataFromRecoveryPasswd();
    }
    
    async getUserById(id:string):Promise<{id:string, username:string, email:string}|null>{
        const getUser = await this.userRepository.getUserById(id)
        if(!getUser){
            throw new Error("error-get-user");
        } 
        return getUser.getUserOnlineData();
    }
}
