import { Band } from '../../bands/entity/band.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { CreateUserNeoDto } from '../dto/createUser.neo.dto';
import { NeoUser } from '../entity/user.neo.entity';

export interface IUsersNeoService {
  findAll(): Promise<NeoUser[]>;
  findById(id: string): Promise<NeoUser>;
  findOne(query: object): Promise<NeoUser>;
  find(query: object): Promise<NeoUser[]>;
  create(createUserDto: CreateUserNeoDto): Promise<NeoUser>;
  update(id: string, newValue: CreateUserNeoDto): Promise<NeoUser | null>;
  findWithOperator(query: object): Promise<NeoUser[]>;
  followUser(currentUser: NeoUser, userToFollow: NeoUser): Promise<NeoUser>;
  followGenreById(currentUser: NeoUser, genreToFollow: Genre): Promise<Genre>;
  followGenreByName(currentUser: NeoUser, genreToFollow: Genre): Promise<Genre>;
  attendEvent(currentUser: NeoUser, eventToAttend: Event): Promise<Event>;
  unfollowUser(currentUser: NeoUser, userToUnfollow: NeoUser): Promise<NeoUser>;
  unfollowGenreById(
    currentUser: NeoUser,
    genreToUnfollow: Genre,
  ): Promise<Genre>;
  unattendEvent(currentUser: NeoUser, eventToUnattend: Event): Promise<Event>;
  findUserWithFollowing(user: NeoUser): Promise<NeoUser>;
  findUserWithFollowers(user: NeoUser): Promise<NeoUser>;
  findUserWithFollowingGenres(user: NeoUser): Promise<NeoUser>;
  findUserWithAttendingFutureEvents(user: NeoUser): Promise<NeoUser>;
  findUserWithFollowersFollowingAndGenres(query: object): Promise<NeoUser>;
  checkForFollowRelationship(id1: number, id2: number): Promise<boolean>;
  checkForAttendanceRelationship(id1: number, id2: number): Promise<boolean>;
  checkForInterestsRelationship(id1: number, id2: number): Promise<boolean>;
  checkForLikesRelationship(id1: number, id2: number): Promise<boolean>;
  findUserWithLikedBands(user: NeoUser): Promise<NeoUser>;
  findUserWithHisBand(user: NeoUser): Promise<NeoUser>;
  likeBand(currentUser: NeoUser, bandToLike: Band): Promise<Band>;
  unlikeBand(currentUser: NeoUser, bandToUnlike: Band): Promise<Band>;
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
