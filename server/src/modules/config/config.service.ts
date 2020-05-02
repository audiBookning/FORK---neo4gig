import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // this.envConfig = dotenv.parse(fs.readFileSync(filePath));

    this.envConfig = {
      PORT: '3000',
      JWTID: 'secret',
      EXPIRATION_TIME: '6',
      FRONTEND: 'http://localhost:1234',
      API: 'http://localhost:3000',
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
