# Office365 Email Backup Solution

An open-source Office 365 email backup solution that allows users to securely back up and restore their emails. Built with modern web technologies and cloud infrastructure.

## Features

- **Automated Email Backup**: Periodic backup of Office 365 emails.
- **Secure Storage**: Emails are stored securely on AWS S3.
- **Efficient Queue Processing**: Uses Redis for queuing and caching tasks.
- **User-Friendly Interface**: Modern React-based frontend built with Vite and TypeScript.
- **Role-Based Access Control**: Secure access with authentication and authorization.
- **Restore Functionality**: Restore emails back to Office 365 accounts.
- **Open-Source & Extensible**: Developers can extend and contribute to the project.

## Tech Stack

### Backend
- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building scalable applications.
- [Redis](https://redis.io/) - Used for queue management and caching.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing backup metadata.

### Frontend
- [React](https://react.dev/) - JavaScript library for building user interfaces.
- [Next](https://nextjs.org/) - NextJS by Vercel.
- [TailwindCSS](https://tailwindcss.org) - Tailwind CSS
- [ShadcnUI](https://ui.shadcn.com) - Shadcn UI
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript.

### Storage
- Driver system for storage, which allows to plug any cloud/ftp storage solutions.

## Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance)
- Redis

### Backend Setup
```sh
git clone https://github.com/bcodesoftware/storix.git
cd backend
npm install
cp .env.example .env # Update environment variables
npm run migrations:permissions # Basic roles and permissions to start
npm run start:dev
```

### Frontend Setup
```sh
cd frontend
npm install
cp .env.example .env # Update frontend environment variables
npm run dev
```

### Environment Variables
#### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/email-backup
REDIS_HOST=localhost
REDIS_PORT=6379
AWS_S3_BUCKET=email-backups
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
O365_CLIENT_ID=your-client-id
O365_CLIENT_SECRET=your-client-secret
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## Usage
- Register/Login as a user.
- Connect Office 365 account.
- Schedule automated backups.
- Restore emails when needed.
- View logs of past backups and restores.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Roadmap
- 🔲 Email Backup & Restore for Office 365
- 🔲 File system drivers
- 🔲 Multi-Tenancy Support
- 🔲 Google Workspace Email Backup
- 🔲 Admin Dashboard for Monitoring

## Support
For any issues or feature requests, open an [issue](https://github.com/bcodesoftware/storix/issues).

## Contributors
Thanks to all contributors who have helped in making this project a success!
