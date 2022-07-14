import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

// import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
// import { ValidationPipe } from 'src/common/validation.pipe';
import { CatsService } from './cats.service';
import { Roles } from './decorator/roles.decorator';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
// import { RolesGuard } from './guards/roles.guard';
import { Cat } from './interfaces/cat.interface';
// import { createCatSchema } from './schema/create-cat.schema';

@Controller('cats')
// @UseGuards(RolesGuard)
@UseInterceptors(TimeoutInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // @Post()
  // @Roles('admin')
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new ForbiddenException();
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.catsService.findOne(+id);
  }

  // @Get()
  // async findOne(@User('firstName') firstName: string) {
  //   console.log(`Hello ${firstName}`);
  // }

  // @Get()
  // findOne(@Query('id', ParseIntPipe) id: number) {
  //   return this.catsService.findOne(id);
  // }

  // @Get(':uuid')
  // async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return this.catsService.findOne(uuid);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
