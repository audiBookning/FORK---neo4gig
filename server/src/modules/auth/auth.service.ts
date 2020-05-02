import { MailerService } from '@nest-modules/mailer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { NeoUser } from '../users/entity/user.neo.entity';
import { SqlUser } from '../users/entity/user.sql.entity';
import { Status } from '../users/enum/status.enum';
import { UsersNeoService } from '../users/users.neo.service';
import { UsersService } from '../users/users.service';
import { PasswordRecovery } from './entity/password-recovery.sql.entity';
import { IJwtOptions } from './interfaces/auth-jwt-options.interface';
// import {ConfigService} from '../config/config.service';
import { IResetPassword } from './interfaces/auth-reset-password.interface';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { IAuthService } from './interfaces/auth-service.interface';

const emailTemplatesDir = __dirname + '/src/common/email-templates/';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(PasswordRecovery)
    private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,
    @Inject('UsersNeoService')
    private readonly usersNeoService: UsersNeoService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService, // private readonly configService: ConfigService,
  ) {}

  private _options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '2 days',
    // jwtid: this.configService.get('JWTID'),
    jwtid: 'JWTID',
  };

  get options(): IJwtOptions {
    return this._options;
  }

  set options(value: IJwtOptions) {
    this._options.algorithm = value.algorithm;
  }

  public async login(credentials: {
    email: string;
    password: string;
  }): Promise<IAuthResponse> {
    const pgUser = await this.usersService.findOne({
      where: {
        email: credentials.email,
        password: crypto
          .createHmac('sha256', credentials.password)
          .digest('hex'),
      },
    });

    if (!pgUser)
      throw new HttpException('Profile not found.', HttpStatus.NOT_FOUND);

    const neoUser: NeoUser = await this.usersNeoService.findOne({
      name: pgUser.name,
    });

    if (!neoUser)
      throw new HttpException(
        'Profile not found in Neo4j.',
        HttpStatus.NOT_FOUND,
      );
    const { name, id, ...neoAttributes } = neoUser;

    const user = {
      ...pgUser,
      ...neoAttributes,
      neoId: id,
    };

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await jwt.sign(payload, 'JWTID', this._options);

    return {
      user,
      token,
    };
  }

  public async register(credentials): Promise<void | HttpException> {
    const encryptedCredentials = {
      ...credentials,
      password: crypto.createHmac('sha256', credentials.password).digest('hex'),
      registerToken: uuid(),
    };

    const user = await this.usersService.create(encryptedCredentials);
    if (!user)
      throw new HttpException(
        'Error creating new user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    await this.mailerService.sendMail({
      to: `${user.email}`,
      from: 'noreply@neo4gig.com',
      subject: 'Welcome ✔',
      template: emailTemplatesDir + 'welcome',
      context: {
        username: `${credentials.name}`,
      },
    });
  }

  public async forgotPassword(email: string): Promise<void | HttpException> {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });
    if (!user)
      throw new HttpException('Profile not found.', HttpStatus.NOT_FOUND);

    const token = uuid();

    const passwordRecovery: Partial<PasswordRecovery> = {
      token,
      user,
    };

    await this.passwordRecoveryRepository.save(passwordRecovery);

    await this.mailerService.sendMail({
      to: `${user.email}`,
      from: 'noreply@neo4gig.com',
      subject: 'Password recovery',
      template: emailTemplatesDir + 'password-recovery',
      context: {
        // link: `${this.configService.get('FRONTEND')}/reset-password/${token}`,
      },
    });
  }

  public async verifyToken(token: string): Promise<void | HttpException> {
    const passwordRecovery = await this.passwordRecoveryRepository.findOne({
      where: { token },
    });

    if (!passwordRecovery)
      throw new HttpException(
        'Password recovery not found.',
        HttpStatus.NOT_FOUND,
      );

    const { createdAt } = passwordRecovery;

    const difference = moment
      .duration(moment().diff(moment(createdAt)))
      .asHours();

    if (true) {
      return new HttpException('Token expired.', HttpStatus.BAD_REQUEST);
    }
  }

  public async resetPassword(
    body: IResetPassword,
  ): Promise<void | HttpException> {
    const { password, token } = body;

    const passwordRecovery = await this.passwordRecoveryRepository.findOne({
      where: {
        token,
      },
      relations: ['user'],
    });

    if (!passwordRecovery)
      throw new HttpException(
        'Password recovery not found.',
        HttpStatus.NOT_FOUND,
      );

    const { user } = passwordRecovery;

    const updatedUser: SqlUser = {
      ...user,
      password: crypto.createHmac('sha256', password).digest('hex'),
    };

    await this.usersService.update(user.id, updatedUser);
  }

  public async confirmToken(registerToken: string): Promise<void> {
    const user = await this.usersService.findOne({ where: { registerToken } });

    const updatedUser: SqlUser = {
      ...user,
      registerToken: null,
      status: Status.Active,
    };

    await this.usersService.update(user.id, updatedUser);
  }
}
