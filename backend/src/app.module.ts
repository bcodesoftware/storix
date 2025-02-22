import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MailboxModule } from './mailbox/mailbox.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    MailboxModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
