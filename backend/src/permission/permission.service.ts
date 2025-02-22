import { Injectable } from '@nestjs/common';
import { Permission, PermissionDocument } from './permission.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    ) {}

    async createPermission(permission: Permission): Promise<PermissionDocument> {
        const createdPermission = new this.permissionModel(permission);
        return createdPermission.save();
    }

    async createOrUpdatePermission(permission: Permission): Promise<PermissionDocument> {
        const existingPermission = await this.permissionModel.findOne({ name: permission.name }).exec();
        if (existingPermission) {
            return this.permissionModel.findByIdAndUpdate(existingPermission._id, permission, { new: true }).exec();
        }
        return this.createPermission(permission);
    }

    async getPermissions(): Promise<PermissionDocument[]> {
        return this.permissionModel.find().exec();
    }

    async getPermissionById(id: string): Promise<PermissionDocument> {
        return this.permissionModel.findById(id).exec();
    }
    
    
}