import { Model } from 'mongoose';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/userRepository';
import { UserDocument, User as userModel} from '../mongoModels/userModel';
import { UpdateUserData } from '../../domain/types/typeUser';

export class DbUserRepository implements UserRepository {
    private userModel: Model<UserDocument>
    userRepository: DbUserRepository;

    async getAllUsers(): Promise<User[] | null> {
        try {
            const userDocuments = await userModel.find().exec();
            const users: User[] = userDocuments.map(doc => new User(
                doc.id,
                doc.username,
                doc.email,
                doc.password
            ));
            return users;
        } catch (error) {
            console.error("Error fetching users: ", error);
            return null;
        }
    }

    async getUserByUsername(username: string, password:string): Promise<User | null> {
        try {
            const userDocument = await userModel.findOne({ username, password }).exec();
            if (!userDocument) {
                return null;
            }
            return new User(
                userDocument.id,
                userDocument.username,
                userDocument.email,
                userDocument.password
            );
        } catch (error) {
            console.error("Error fetching user: ", error);
            return null;
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const userDocument = await userModel.findOne({email}).exec()
            if(!userDocument){
                return null
            }
            return new User(
                userDocument.id,
                userDocument.username,
                userDocument.email,
                userDocument.password
            );
        } catch (error) {
            console.error("Error fetching user: ", error);
            return null;
        }
    }
    async getUserById(id: string): Promise<User | null> {
        try {
            const userDocument = await userModel.findById(id).exec();
            if(!userDocument){
                return null
            }
            return new User(
                userDocument.id,
                userDocument.username,
                userDocument.email,
                userDocument.password
            );
        } catch (error) {
            console.error("Error fetching user: ", error);
            return null;
        }
    }






    async createUser(username: string, email: string, password: string): Promise<User> {
        console.log(username, email, password)
        try {
            const newUser = new userModel({ username, email, password });
            const savedUser = await newUser.save();
            return new User(
                savedUser.id,
                savedUser.username,
                savedUser.email,
                savedUser.password
            );
        } catch (error) {
            console.error("Error creating user: ", error);
            throw new Error("User creation failed");
        }
    }

    async checkDuplicate(email: string): Promise<User | null> {
        try {
            const userDocument = await userModel.findOne({ email }).exec();
            if (!userDocument) {
                return null;
            }
            return new User(
                userDocument.id,
                userDocument.username,
                userDocument.email,
                userDocument.password
            );
        } catch (error) {
            console.error("Error checking duplicate user: ", error);
            return null;
        }
    }

    async updateUser(email: string, updateData: UpdateUserData): Promise<User | null> {
        try {
            const userDocument = await userModel.findOneAndUpdate({ email }, updateData, { new: true }).exec();
            if (!userDocument) {
                return null;
            }
            return new User(
                userDocument.id,
                userDocument.username,
                userDocument.email,
                userDocument.password
            );
        } catch (error) {
            console.error("Error updating user: ", error);
            return null;
        }
    }

    async updatePasswdfromUserbyId(userId: string, password: string): Promise<User | null> {
        try {
            const userDocument = await userModel.findById(userId)
            if(!userDocument){
                return null;
            }
            userDocument.password = password;
            const updatedUser = await userDocument.save();
            return new User(
                updatedUser.id,
                updatedUser.username,
                updatedUser.email,
                updatedUser.password
            );
        } catch (error) {
            console.log('Error update new passwd', error)
            return null;
        }
    }

    async deleteUser(email: string): Promise<void> {
        try {
            await userModel.findOneAndDelete({ email }).exec();
        } catch (error) {
            console.error("Error deleting user: ", error);
            throw new Error("User deletion failed");
        }
    }
}
