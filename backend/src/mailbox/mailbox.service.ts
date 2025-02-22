import { Injectable } from '@nestjs/common';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { TokenManager } from '../utils/token-manager';
import { UserDocument } from '../user/user.schema';
import axios from 'axios';
@Injectable()
export class MailboxService {

    constructor(
        private readonly userService: UserService,
        private tokenManager: TokenManager,
    ) { }

    async getMailboxes(user: Partial<UserDocument>) {
        const accessToken = await this.tokenManager.validateAndGetAccessToken(user);
        // Use the accessToken for Microsoft Graph API calls
        try {
            //get all mailboxes from directory
            const response = await axios.get('https://graph.microsoft.com/v1.0/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error.response.data);
        }
    }
}
