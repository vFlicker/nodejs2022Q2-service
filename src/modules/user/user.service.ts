import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Message } from './constants/message.constants';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
      },
    });

    return this.exclude(newUser, 'password');
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.exclude(user, 'password'));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException(Message.NOT_FOUND);

    return this.exclude(user, 'password');
  }

  async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException(Message.NOT_FOUND);

    if (user.password !== oldPassword) {
      throw new ForbiddenException(Message.WRONG_PASSWORD);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });

    return this.exclude(updatedUser, 'password');
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(Message.NOT_FOUND);

    await this.prisma.user.delete({ where: { id } });
  }

  private exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) delete user[key];
    return user;
  }
}
