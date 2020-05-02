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
import { CreateGenreNeoDto } from './dto/createGenre.neo.dto';
import { IGenresNeoService } from './interfaces/genres-service.neo.interface';

@Controller('genres')
export class GenresController {
  private readonly genresService: IGenresNeoService;

  constructor(@Inject('GenresNeoService') genresService: IGenresNeoService) {
    this.genresService = genresService;
  }

  @Get()
  public async getGenres(@Response() res) {
    const genres = await this.genresService.findAllWithUsers();
    return res.status(HttpStatus.OK).json(genres);
  }

  @Get('/:id')
  public async getGenre(@Response() res, @Param('id') id) {
    const genre = await this.genresService.findById(id);
    return res.status(HttpStatus.OK).json(genre);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createGenre(
    @Response() res,
    @Body() createGenreNeoDto: CreateGenreNeoDto,
  ) {
    const genre = await this.genresService.create(createGenreNeoDto);
    return res.status(HttpStatus.OK).json(genre);
  }

  @Put('/:id')
  public async updateGenre(@Param('id') id, @Response() res, @Body() body) {
    const genre = await this.genresService.update(id, body);
    return res.status(HttpStatus.OK).json(genre);
  }
}
