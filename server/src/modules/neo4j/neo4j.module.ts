import { Module } from '@nestjs/common';
import { Neo4jProvider } from './neo4j.provider';
import { Neo4jService } from './neo4j.service';

@Module({
  providers: [Neo4jProvider, Neo4jService],
  exports: [Neo4jService],
})
export class Neo4jModule {}
