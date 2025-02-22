import { Module } from '@nestjs/common';
import { MailboxController } from './mailbox.controller';
import { MailboxService } from './mailbox.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';
import { TokenManager } from 'src/utils/token-manager';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule
  ],
  controllers: [MailboxController],
  providers: [MailboxService, TokenManager],
})
export class MailboxModule {}
