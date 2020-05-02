import { AbstractNeoEntity } from '../../../common/entity/abstract-neo-entity.';
import { Band } from '../../bands/entity/band.neo.entity';
import { Event } from '../../events/entity/event.neo.entity';
import { Genre } from '../../genres/entity/genre.neo.entity';
import { CreateUserNeoDto } from '../dto/createUser.neo.dto';

export class NeoUser extends AbstractNeoEntity {
  static readonly entityName = 'User';
  static readonly relationships = {
    'User->': {
      relationShipName: 'FOLLOWS',
      property: 'following',
      className: NeoUser,
    },
    'User<-': {
      relationShipName: 'FOLLOWS',
      property: 'followers',
    },
    'Genre->': {
      relationShipName: 'INTERESTED_INTO',
      property: 'genres',
      className: Genre,
    },
    'Event->': {
      relationShipName: 'ATTENDS',
      property: 'events',
      className: Event,
    },
    'Band->': {
      relationShipName: 'LIKES',
      property: 'likedBands',
      className: NeoUser,
    },
    'Band<-': {
      relationShipName: 'HAS_MEMBER',
      property: 'band',
    },
  };

  constructor();
  constructor(user: CreateUserNeoDto);
  constructor(user?: any) {
    super();
    this.id = (user && user.id) || null;
    this.name = (user && user.name) || null;
    this.email = (user && user.email) || null;
    this.city = (user && user.city) || null;
    this.instrument = (user && user.instrument) || null;
    this.isMusician = user && user.isMusician;
    this.following = (user && user.following) || null;
    this.followers = (user && user.followers) || null;
    this.genres = (user && user.followers) || null;
    this.likedBands = (user && user.likedBands) || null;
    this.band = (user && user.band) || null;
  }

  id: number;

  name: string;

  email: string;

  city: string;

  instrument: string;

  isMusician: string;

  following: NeoUser[];

  followers: NeoUser[];

  genres: Genre[];

  events: Event[];

  likedBands: Band[];

  band: Band;

  static associate(entityName): { relationShipName; property; className? } {
    if (NeoUser.relationships === null) {
      return null;
    }

    return NeoUser.relationships[entityName];
  }
}
