import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordRecovery } from './entity/password-recovery.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([PasswordRecovery]),
  ],
  providers: [{ provide: 'IAuthService', useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}
