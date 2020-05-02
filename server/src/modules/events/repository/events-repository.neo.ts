import { AbstractNeoRepository } from '../../../common/repository/abstract-neo-repository';
import { Neo4jService } from '../../neo4j/neo4j.service';
import { Event } from '../entity/event.neo.entity';

class EventsNeoRepository extends AbstractNeoRepository {
  constructor(neo4jService: Neo4jService) {
    super(Event, neo4jService);
  }
}

export const EventsNeoRepositoryProvider = {
  provide: 'EventsNeoRepository',
  inject: [Neo4jService],
  useFactory: (neo4jService: Neo4jService) =>
    new EventsNeoRepository(neo4jService),
};
