import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('microsoft')
  @Public()
  async microsoftCallback(@Body() body: { code: string }) {
    if (!body.code) {
      throw new Error('Authorization code is required');
    }

    return this.authService.microsoftCallback(body.code);

    
  }

}
