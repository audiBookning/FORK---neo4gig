import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Response,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBandNeoDto } from './dto/createBand.neo.dto';
import { IBandsNeoService } from './interfaces/bands-service.neo.interface';

@Controller('bands')
export class BandsController {
  private readonly bandsService: IBandsNeoService;

  constructor(@Inject('BandsNeoService') bandsService: IBandsNeoService) {
    this.bandsService = bandsService;
  }

  @Get()
  public async getBands(@Response() res) {
    const bands = await this.bandsService.findAllWithUsers();
    return res.status(HttpStatus.OK).json(bands);
  }

  @Get('/:id')
  public async getBand(@Response() res, @Param('id') id) {
    const band = await this.bandsService.findById(id);
    return res.status(HttpStatus.OK).json(band);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createBand(
    @Response() res,
    @Body() createBandNeoDto: CreateBandNeoDto,
  ) {
    const band = await this.bandsService.create(createBandNeoDto);
    return res.status(HttpStatus.OK).json(band);
  }

  @Put('/:id')
  public async updateBand(@Param('id') id, @Response() res, @Body() body) {
    const band = await this.bandsService.update(id, body);
    return res.status(HttpStatus.OK).json(band);
  }
}
