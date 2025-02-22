import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    
    //create user
    async createUser(user: Partial<User>): Promise<UserDocument> {
       const existingUser = await this.userModel.findOne({ email: user.email });
       if (existingUser) {
        throw new Error('User already exists');
       }
       const newUser = new this.userModel(user);
       return newUser.save();
    }

    async loginOrRegister(user: Partial<User>): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            return existingUser;
        }
        return this.createUser(user);
    }
    
    //find user by email
    async findUserByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }

    //find user by id
    async findUserById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }

    async updateUser(userId: string, updateData: Partial<UserDocument>): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
    }

}
