import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Permission } from '../permission/permission.schema';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Permission' }] })
    permissions: Permission[];
    
}

export const RoleSchema = SchemaFactory.createForClass(Role);


