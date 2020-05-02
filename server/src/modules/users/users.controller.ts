import {
  Body,
  Controller,
  Delete,
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
import { CreateEventNeoDto } from '../events/dto/createEvent.neo.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { IUsersService } from './interfaces/users-service.interface';

@Controller('users')
export class UsersController {
  private readonly usersService: IUsersService;

  constructor(@Inject('UsersService') usersService: IUsersService) {
    this.usersService = usersService;
  }

  @Get()
  public async getUsers(@Response() res) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  public async getUser(@Response() res, @Param('id') id) {
    const user = await this.usersService.findById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/:id/feed')
  public async getUserFeed(@Response() res, @Param('id') id) {
    const user = await this.usersService.getUserFeed(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(
    @Response() res,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put('/:id')
  public async updateUser(@Param('id') id, @Response() res, @Body() body) {
    const user = await this.usersService.update(id, body);
    return res.status(HttpStatus.OK).json(user);
  }

  // TODO: not using the param id?
  @Put('/:id/follow-change')
  public async updateUserFollows(
    @Param('id') id,
    @Response() res,
    @Body() body,
  ) {
    const user = await this.usersService.updateFollow(body);
    return res.status(HttpStatus.OK).json(user);
  }

  // TODO: not using the param id?
  @Put('/:id/interest-change')
  public async updateUserInterests(
    @Param('id') id,
    @Response() res,
    @Body() body,
  ) {
    const genre = await this.usersService.updateInterest(body);
    return res.status(HttpStatus.OK).json(genre);
  }

  // TODO: not using the param id?
  @Put('/:id/attendance-change')
  public async updateUserAttendings(
    @Param('id') id,
    @Response() res,
    @Body() body,
  ) {
    const event = await this.usersService.updateAttendance(body);
    return res.status(HttpStatus.OK).json(event);
  }

  // TODO: not using the param id?
  @Put('/:id/likes-change')
  public async updateUserLikes(@Param('id') id, @Response() res, @Body() body) {
    const band = await this.usersService.updateLikes(body);
    return res.status(HttpStatus.OK).json(band);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id, @Response() res) {
    const user = await this.usersService.delete(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/:neoId/events')
  @UsePipes(new ValidationPipe())
  public async createEvent(
    @Param('neoId') neoId,
    @Response() res,
    @Body() createEventNeoDto: CreateEventNeoDto,
  ) {
    const user = await this.usersService.createEvent(neoId, createEventNeoDto);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/:neoId/genres/:id/suggested')
  public async getSuggestedUsersForGenre(
    @Response() res,
    @Param('neoId') neoId,
    @Param('id') id,
  ) {
    const users = await this.usersService.getSuggestedUsersByGenre(
      id,
      neoId,
      5,
    );
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:neoId/bands/:id/suggested')
  public async getSuggestedUsersForBand(
    @Response() res,
    @Param('neoId') neoId,
    @Param('id') id,
  ) {
    const users = await this.usersService.getSuggestedUsersByBand(id, neoId, 5);
    return res.status(HttpStatus.OK).json(users);
  }
}
