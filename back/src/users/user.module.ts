import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import UsersRepository from './user.repository';
import { MeController } from './me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, MeController],
  providers: [UserService, UsersRepository],
  exports: [UserService],
})
export class UserModule {}
