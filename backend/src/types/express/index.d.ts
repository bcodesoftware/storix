import { Express } from 'express-serve-static-core'
import { UserDocument } from 'src/user/user.schema'

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserDocument>
    }
  }
} 