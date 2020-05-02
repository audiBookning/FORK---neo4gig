import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandsModule } from '../bands/bands.module';
import { EventsModule } from '../events/events.module';
import { GenresModule } from '../genres/genres.module';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { SqlUser } from './entity/user.sql.entity';
import { UsersNeoRepositoryProvider } from './repository/users-repository.neo';
import { UsersController } from './users.controller';
import { UsersNeoService } from './users.neo.service';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SqlUser]),
    Neo4jModule,
    EventsModule,
    GenresModule,
    BandsModule,
  ],
  controllers: [UsersController],
  providers: [UsersNeoRepositoryProvider, UsersService, UsersNeoService],
  exports: [UsersService, UsersNeoService],
})
export class UsersModule {}
