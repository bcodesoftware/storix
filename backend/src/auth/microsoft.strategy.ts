import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('MICROSOFT_CLIENT_ID'),
      clientSecret: configService.get('MICROSOFT_CLIENT_SECRET'),
      callbackURL: configService.get('MICROSOFT_REDIRECT_URI'),
      scope: ['email', 'profile', 'openid', 'User.Read'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, displayName, emails } = profile;

    return {
      id,
      displayName,
      emails,
    };
  }
}
