import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async microsoftCallback(code: string) {
        try {
            const params = new URLSearchParams({
                client_id: process.env.MICROSOFT_CLIENT_ID,
                client_secret: process.env.MICROSOFT_CLIENT_SECRET,
                code: code,
                redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
                grant_type: 'authorization_code',
                scope: 'email profile openid User.Read offline_access Directory.Read.All Mail.Read Mail.ReadWrite Directory.Read.All MailboxSettings.Read User.ReadBasic.All'
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

            const userInfo = await axios.get('https://graph.microsoft.com/v1.0/me', {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                },
            });


            const user = await this.userService.loginOrRegister({
                email: userInfo.data.mail,
                firstName: userInfo.data.givenName,
                lastName: userInfo.data.surname,
                provider: 'microsoft',
                providerId: userInfo.data.id,
                providerAccessToken: response.data.access_token,
                providerRefreshToken: response.data.refresh_token,
                providerExpiresAt: new Date(Date.now() + response.data.expires_in * 1000),
            });

            const payload = {
                sub: user._id as string,
                email: user.email,
            };

            const accessToken = this.jwtService.sign(payload);

            return {
                accessToken,
                user,
            };
            
        } catch (error) {
            console.error('Microsoft auth error:', error.response?.data || error.message);
            throw error;
        }
    }
}
