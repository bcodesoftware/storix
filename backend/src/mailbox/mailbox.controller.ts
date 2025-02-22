import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MailboxService } from './mailbox.service';
import { Request } from 'express';
import { PermissionGuard } from '../permission/permission.guard';
import { RequirePermissions } from '../permission/permission.decorator';

@Controller('mailbox')
@UseGuards(PermissionGuard)
export class MailboxController {
  constructor(private readonly mailboxService: MailboxService) {}

  @Get()
  @RequirePermissions('READ_MAIL')
  async getMailbox(@Req() req: Request & { user?: any }) {
    return this.mailboxService.getMailboxes(req.user);
  }
}
