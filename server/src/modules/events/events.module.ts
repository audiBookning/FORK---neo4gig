import { Module } from '@nestjs/common';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { EventsController } from './events.controller';
import { EventsNeoService } from './events.neo.service';
import { EventsNeoRepositoryProvider } from './repository/events-repository.neo';

@Module({
  imports: [Neo4jModule],
  controllers: [EventsController],
  providers: [EventsNeoRepositoryProvider, EventsNeoService],
  exports: [EventsNeoService],
})
export class EventsModule {}
