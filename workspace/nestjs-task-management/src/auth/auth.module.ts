import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    // configuring Passport to take JWT tokens and use that for authenticating the user
    // passport supports multiple strategies. Here we are going to use JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // configuring JWTModule
    JwtModule.register({
      // for prod, we will be overwrite the secret using env variable JWT_SECRET.
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // 1 hr
      },
    }),

    /* 
    Passing array of repositories that we want to include in this Auth Module.
    Since its not AppModule, so using forFeature() instead of forRoot().
    Below line makes the TypeOrmModule which comes from NestJS 
    include this UserRepository instance injectable independency injection throughout this module.
    */
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  // exporting JwtStrategy and PassportModule so that it can be used in other modules
  // which need this JWT guarding for certain operations or protected resources
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
