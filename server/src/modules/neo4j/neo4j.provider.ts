import { auth, driver } from 'neo4j-driver';

export const Neo4jProvider = {
  provide: 'Neo4jProvider',
  useFactory: () =>
    driver('bolt://localhost:7687', auth.basic('neo4j', 'nova55dggYYh')),
};
