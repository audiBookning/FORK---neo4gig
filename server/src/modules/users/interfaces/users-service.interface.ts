import { HttpException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Band } from '../../bands/entity/band.neo.entity';
import { CreateEventNeoDto } from '../../events/dto/createEvent.neo.dto';
import { Event } from '../../events/entity/event.neo.entity';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { CreateUserPgDto } from '../dto/createUser.pg.dto';
import { NeoUser } from '../entity/user.neo.entity';
import { SqlUser } from '../entity/user.sql.entity';

export interface IUsersService {
  findAll(): Promise<SqlUser[]>;
  findById(id: string): Promise<SqlUser>;
  findOne(query: object): Promise<SqlUser>;
  getUserFeed(id: string): Promise<SqlUser>;
  create(createUserDto: CreateUserPgDto): Promise<SqlUser>;
  update(id: string, newValue: CreateUserPgDto): Promise<SqlUser | null>;
  delete(id: string): Promise<DeleteResult>;
  updateFollow(ids: any): Promise<NeoUser | HttpException>;
  updateInterest(ids: any): Promise<Genre | HttpException>;
  updateAttendance(ids: any): Promise<Event | HttpException>;
  updateLikes(ids: any): Promise<Band | HttpException>;
  createEvent(
    neoId: string,
    createEventNeoDto: CreateEventNeoDto,
  ): Promise<Event>;
  getSuggestedUsersByGenre(
    genreId: number,
    userId: number,
    limit: number,
  ): Promise<NeoUser[]>;
  getSuggestedUsersByBand(
    bandId: number,
    userId: number,
    limit: number,
  ): Promise<NeoUser[]>;
}
