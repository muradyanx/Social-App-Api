import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    roleId: number;
    securityStamp: string;
  };
}