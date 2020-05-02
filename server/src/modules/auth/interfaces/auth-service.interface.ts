import { HttpException } from '@nestjs/common';
import { IResetPassword } from './auth-reset-password.interface';
import { IAuthResponse } from './auth-response.interface';

export interface IAuthService {
  login(credentials): Promise<IAuthResponse>;
  register(credentials): Promise<void | HttpException>;
  forgotPassword(email: string): Promise<void | HttpException>;
  verifyToken(token: string): Promise<void | HttpException>;
  resetPassword(body: IResetPassword): Promise<void | HttpException>;
  confirmToken(registerToken: string): Promise<void>;
}
