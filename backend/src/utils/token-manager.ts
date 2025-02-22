import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import axios from 'axios';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenManager {
  constructor(private userService: UserService) {}

  async validateAndGetAccessToken(user: Partial<UserDocument>): Promise<string> {

    if (!user?.providerAccessToken || !user?.providerRefreshToken) {
      throw new UnauthorizedException('Missing tokens');
    }

    // Check if access token is expired
    if (this.isTokenExpired(user.providerExpiresAt)) {
      try {
        // Get new tokens using refresh token
        const params = new URLSearchParams({
          client_id: process.env.MICROSOFT_CLIENT_ID,
          client_secret: process.env.MICROSOFT_CLIENT_SECRET,
          refresh_token: user.providerRefreshToken,
          grant_type: 'refresh_token',
        });

        const response = await axios.post(
          'https://login.microsoftonline.com/common/oauth2/v2.0/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        // Update user with new tokens
        const tokenExpiry = new Date();
        tokenExpiry.setSeconds(tokenExpiry.getSeconds() + response.data.expires_in);

        await this.userService.updateUser(user._id as string, {
          providerAccessToken: response.data.access_token,
          providerRefreshToken: response.data.refresh_token || user.providerRefreshToken,
          providerExpiresAt: tokenExpiry,
        });

        return response.data.access_token;
      } catch (error) {
        throw new UnauthorizedException('Failed to refresh token');
      }
    }

    return user.providerAccessToken;
  }

  private isTokenExpired(tokenExpiry: Date): boolean {
    if (!tokenExpiry) return true;
    return new Date() >= new Date(tokenExpiry);
  }
} 