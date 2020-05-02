#!/usr/bin/env ts-node
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { BandSeed } from './bands-seed';
import { EventSeed } from './events-seed';
import { GenreSeed } from './genres-seed';
import { RelationsSeed } from './relations-seed';
import { UserSeed } from './users-seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let seeders = [GenreSeed, UserSeed, EventSeed, BandSeed, RelationsSeed];
  const type = process.argv[2];

  if (type === 'down') {
    seeders = seeders.reverse();
  }

  seeders
    .reduce(
      (chain, item) => chain.then(() => item[type](app)),
      Promise.resolve(),
    )
    .then(() => {
      console.log(`Neo4j seeds successfully ran ${type}.`);
      process.exit(0);
    })
    .catch(ex => {
      console.log(ex);
      process.exit(0);
    });
}
bootstrap();
