import { Module } from '@nestjs/common';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { GenresController } from './genres.controller';
import { GenresNeoService } from './genres.neo.service';
import { GenresNeoRepositoryProvider } from './repository/genres-repository.neo';

@Module({
  imports: [Neo4jModule],
  controllers: [GenresController],
  providers: [GenresNeoRepositoryProvider, GenresNeoService],
  exports: [GenresNeoService],
})
export class GenresModule {}
