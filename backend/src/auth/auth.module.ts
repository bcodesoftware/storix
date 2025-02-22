import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MicrosoftStrategy } from './microsoft.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'microsoft' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MicrosoftStrategy, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AuthModule {}
