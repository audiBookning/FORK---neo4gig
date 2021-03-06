import { Inject, Injectable } from '@nestjs/common';
import { CreateBandNeoDto } from './dto/createBand.neo.dto';
import { Band } from './entity/band.neo.entity';
import { IBandsNeoService } from './interfaces/bands-service.neo.interface';
import { User } from '../users/entity/user.neo.entity';

@Injectable()
export class BandsNeoService implements IBandsNeoService {
    constructor(
        @Inject('BandsNeoRepository') private readonly bandsNeoRepository,
    ) {}

    async findAll(): Promise<Band[]> {
        return await this.bandsNeoRepository.find();
    }

    async findAllWithUsers(): Promise<Band[]> {
        return await this.bandsNeoRepository.findAllWithUsers();
    }

    async findById(id: string): Promise<Band> {
        return await this.bandsNeoRepository.findById(id);
    }

    async findOne(query: object): Promise<Band> {
        return await this.bandsNeoRepository.findOne(query);
    }

    async find(query: object): Promise<Band[]> {
        return await this.bandsNeoRepository.find(query);
    }

    async create(createBandNeoDto: CreateBandNeoDto): Promise<Band> {
        return await this.bandsNeoRepository.save(createBandNeoDto);
    }

    async update(id: string, newValue: CreateBandNeoDto): Promise<Band | null> {

        return await this.bandsNeoRepository.update({ ...newValue, id });
    }

    async addMember(band: Band, userToAdd: User): Promise<User> {
        const bandId = band.id;
        const userToAddId = userToAdd.id;

        return await this.bandsNeoRepository.createRelationship(bandId, userToAddId, User.entityName);
    }
}
