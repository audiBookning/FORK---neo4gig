import { Module } from '@nestjs/common';
// import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BandsModule } from './modules/bands/bands.module';
import { EventsModule } from './modules/events/events.module';
import { GenresModule } from './modules/genres/genres.module';
import { Neo4jModule } from './modules/neo4j/neo4j.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'neo4gig',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

      migrations: ['__dirname/db/postgresql/migrations/*.ts'],
      cli: {
        migrationsDir: '__dirname/db/postgresql/migrations',
      },
    }),
    Neo4jModule,
    UsersModule,
    GenresModule,
    EventsModule,
    BandsModule,
    AuthModule,
    // ConfigModule,
  ],
})
export class AppModule {}
