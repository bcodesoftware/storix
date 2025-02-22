import { Injectable } from '@nestjs/common';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}
    
    async createRole(role: Role): Promise<RoleDocument> {
        const createdRole = new this.roleModel(role);
        return createdRole.save();
    }

    async createOrUpdateRole(role: Role): Promise<RoleDocument> {
        const existingRole = await this.roleModel.findOne({ name: role.name }).exec();
        if (existingRole) {
            return this.roleModel.findByIdAndUpdate(existingRole._id, role, { new: true }).exec();
        }
        return this.createRole(role);
    }

    async getRoles(): Promise<RoleDocument[]> {
        return this.roleModel.find().exec();
    }

    async getRoleById(id: string): Promise<RoleDocument> {
        return this.roleModel.findById(id).populate('permissions').exec();
    }

    async deleteRole(id: string): Promise<RoleDocument> {
        return this.roleModel.findByIdAndDelete(id).exec();
    }

    async addPermissionToRole(roleId: string, permissionId: string): Promise<RoleDocument> {
        return this.roleModel.findByIdAndUpdate(
            roleId,
            { $push: { permissions: permissionId } },
            { new: true }
        ).exec();
    }

    async removePermissionFromRole(roleId: string, permissionId: string): Promise<RoleDocument> {
        return this.roleModel.findByIdAndUpdate(
            roleId,
            { $pull: { permissions: permissionId } },
            { new: true }
        ).exec();
    }

    async getRoleWithPermissions(roleId: string): Promise<RoleDocument> {
        return this.roleModel.findById(roleId).populate('permissions').exec();
    }
}