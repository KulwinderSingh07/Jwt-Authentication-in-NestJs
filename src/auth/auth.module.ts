import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenstrategy, Tokenstrategy } from './strategies';

@Module({
  imports:[MongooseModule.forFeature([{name:"Users",schema:UserSchema}]),JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,Tokenstrategy,RefreshTokenstrategy]
})
export class AuthModule {}
