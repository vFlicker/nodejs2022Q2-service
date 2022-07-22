import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
