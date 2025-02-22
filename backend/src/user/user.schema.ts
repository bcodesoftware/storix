import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/role/role.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true, unique: true })
  providerId: string;

  @Prop({ default: null })
  providerAccessToken: string;

  @Prop({ default: null })
  providerRefreshToken: string;

  @Prop({ default: null })
  providerExpiresAt: Date;

  @Prop({ default: Date.now })
  lastLogin: Date;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  tokenExpiry: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

}

export const UserSchema = SchemaFactory.createForClass(User);
