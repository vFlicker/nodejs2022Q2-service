import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as createId } from 'uuid';

import { Message } from './constants/user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: createId(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(Message.NOT_FOUND);
    return user;
  }

  updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): User {
    const user = this.findOne(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException(Message.WRONG_PASSWORD);
    }

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException(Message.NOT_FOUND);
    this.users.splice(index, 1);
  }
}
