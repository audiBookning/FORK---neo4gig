import { Module } from '@nestjs/common';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { BandsController } from './bands.controller';
import { BandsNeoService } from './bands.neo.service';
import { BandsNeoRepositoryProvider } from './repository/bands-repository.neo';

@Module({
  imports: [Neo4jModule],
  controllers: [BandsController],
  providers: [BandsNeoRepositoryProvider, BandsNeoService],
  exports: [BandsNeoService],
})
export class BandsModule {}
