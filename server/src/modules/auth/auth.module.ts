import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordRecovery } from './entity/password-recovery.sql.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([PasswordRecovery]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'hakaton.medicine@gmail.com',
          pass: 'hakaton1!',
        },
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"neogig" <neogig@mail.com>', // outgoing email ID
        forceEmbeddedImages: true,
      },
      template: {
        dir: process.cwd() + '/common/email-templates/',
        adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [{ provide: 'IAuthService', useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}
