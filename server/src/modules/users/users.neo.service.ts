import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { RelationshipSide } from '../../common/enum/neo-relationship-side.enum';
import { Band } from '../bands/entity/band.neo.entity';
import { Event } from '../events/entity/event.neo.entity';
import { Genre } from '../genres/entity/genre.neo.entity';
import { CreateUserNeoDto } from './dto/createUser.neo.dto';
import { NeoUser } from './entity/user.neo.entity';
import { IUsersNeoService } from './interfaces/users-service.neo.interface';

@Injectable()
export class UsersNeoService implements IUsersNeoService {
  constructor(
    @Inject('UsersNeoRepository') private readonly usersNeoRepository,
  ) {}

  async findAll(): Promise<NeoUser[]> {
    return await this.usersNeoRepository.find();
  }

  async findById(id: string): Promise<NeoUser> {
    return await this.usersNeoRepository.findById(id);
  }

  async findOne(query: object): Promise<NeoUser> {
    return await this.usersNeoRepository.findOne(query);
  }

  async find(query: object): Promise<NeoUser[]> {
    return await this.usersNeoRepository.find(query);
  }

  async create(createUserNeoDto: CreateUserNeoDto): Promise<NeoUser> {
    return await this.usersNeoRepository.save(createUserNeoDto);
  }

  async update(
    id: string,
    newValue: CreateUserNeoDto,
  ): Promise<NeoUser | null> {
    return await this.usersNeoRepository.update({ ...newValue, id });
  }

  async findWithOperator(query: object): Promise<NeoUser[]> {
    return await this.usersNeoRepository.findWithOperator(query);
  }

  async followUser(
    currentUser: NeoUser,
    userToFollow: NeoUser,
  ): Promise<NeoUser> {
    const currentUserId = currentUser.id;
    const userToFollowId = userToFollow.id;

    return await this.usersNeoRepository.createRelationship(
      currentUserId,
      userToFollowId,
      NeoUser.entityName,
    );
  }

  async followGenreById(
    currentUser: NeoUser,
    genreToFollow: Genre,
  ): Promise<Genre> {
    const currentUserId = currentUser.id;
    const genreToFollowId = genreToFollow.id;

    return await this.usersNeoRepository.createRelationship(
      currentUserId,
      genreToFollowId,
      Genre.entityName,
    );
  }

  async followGenreByName(
    currentUser: NeoUser,
    genreToFollow: Genre,
  ): Promise<Genre> {
    const currentUserId = currentUser.id;
    const { name } = genreToFollow;

    return await this.usersNeoRepository.createRelationshipWithQuery(
      currentUserId,
      { name },
      Genre.entityName,
    );
  }

  async attendEvent(
    currentUser: NeoUser,
    eventToAttend: Event,
  ): Promise<Event> {
    const currentUserId = currentUser.id;
    const eventToAttendId = eventToAttend.id;

    return await this.usersNeoRepository.createRelationship(
      currentUserId,
      eventToAttendId,
      Event.entityName,
    );
  }

  async unfollowUser(
    currentUser: NeoUser,
    userToUnfollow: NeoUser,
  ): Promise<NeoUser> {
    const currentUserId = currentUser.id;
    const userToUnfollowId = userToUnfollow.id;

    return await this.usersNeoRepository.deleteRelationship(
      currentUserId,
      userToUnfollowId,
      NeoUser.entityName,
    );
  }

  async unfollowGenreById(
    currentUser: NeoUser,
    genreToUnfollow: Genre,
  ): Promise<Genre> {
    const currentUserId = currentUser.id;
    const genreToUnfollowId = genreToUnfollow.id;

    return await this.usersNeoRepository.deleteRelationship(
      currentUserId,
      genreToUnfollowId,
      Genre.entityName,
    );
  }

  async unattendEvent(
    currentUser: NeoUser,
    eventToUnattend: Event,
  ): Promise<Event> {
    const currentUserId = currentUser.id;
    const eventToUnattendId = eventToUnattend.id;

    return await this.usersNeoRepository.deleteRelationship(
      currentUserId,
      eventToUnattendId,
      Event.entityName,
    );
  }

  async findUserWithFollowing(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationship(
      id,
      NeoUser.entityName,
      RelationshipSide.FromMe,
    );
  }

  async findUserWithFollowers(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationship(
      id,
      NeoUser.entityName,
      RelationshipSide.ToMe,
    );
  }

  async findUserWithFollowingGenres(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationship(
      id,
      Genre.entityName,
      RelationshipSide.FromMe,
    );
  }

  async findUserWithAttendingFutureEvents(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationshipWithQuery(
      id,
      Genre.entityName,
      RelationshipSide.ToMe,
      { dateAndTime: `> ${moment().format()}` },
    );
  }

  async findUserWithFollowersFollowingAndGenres(
    query: object,
  ): Promise<NeoUser> {
    return await this.usersNeoRepository.findWithFollowersFollowingGenresAndEvents(
      query,
    );
  }

  async checkForFollowRelationship(id1: number, id2: number): Promise<boolean> {
    return await this.usersNeoRepository.checkForRelationShip(id1, id2, 'User');
  }

  async checkForAttendanceRelationship(
    id1: number,
    id2: number,
  ): Promise<boolean> {
    return await this.usersNeoRepository.checkForRelationShip(
      id1,
      id2,
      'Event',
    );
  }

  async checkForInterestsRelationship(
    id1: number,
    id2: number,
  ): Promise<boolean> {
    return await this.usersNeoRepository.checkForRelationShip(
      id1,
      id2,
      'Genre',
    );
  }

  async checkForLikesRelationship(id1: number, id2: number): Promise<boolean> {
    return await this.usersNeoRepository.checkForRelationShip(id1, id2, 'Band');
  }

  async findUserWithLikedBands(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationship(
      id,
      Band.entityName,
      RelationshipSide.FromMe,
    );
  }

  async findUserWithHisBand(user: NeoUser): Promise<NeoUser> {
    const { id } = user;
    return await this.usersNeoRepository.getRelationship(
      id,
      Band.entityName,
      RelationshipSide.ToMe,
    );
  }

  async likeBand(currentUser: NeoUser, bandToLike: Band): Promise<Band> {
    const currentUserId = currentUser.id;
    const bandToLikeId = bandToLike.id;

    return await this.usersNeoRepository.createRelationship(
      currentUserId,
      bandToLikeId,
      Band.entityName,
    );
  }

  async unlikeBand(currentUser: NeoUser, bandToUnlike: Band): Promise<Band> {
    const currentUserId = currentUser.id;
    const bandToUnlikeId = bandToUnlike.id;

    return await this.usersNeoRepository.deleteRelationship(
      currentUserId,
      bandToUnlikeId,
      Band.entityName,
    );
  }

  async getSuggestedUsersByGenre(
    genreId: number,
    userId: number,
    limit: number = 5,
  ): Promise<NeoUser[]> {
    return await this.usersNeoRepository.findSuggestedUsersByGenre(
      genreId,
      userId,
      limit,
    );
  }

  async getSuggestedUsersByBand(
    bandId: number,
    userId: number,
    limit: number = 5,
  ): Promise<NeoUser[]> {
    return await this.usersNeoRepository.findSuggestedUsersByBand(
      bandId,
      userId,
      limit,
    );
  }
}
