import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

/*
  Setting up JWT passport strategy for authorization
  Here Lot of things are done under the hood by @nestjs/passport using passport-jwt
  Using @Injectable because we are going to expose it as a service,
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      // define how to extract JWT. Here from Authorization Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // to verify the signature of the token that is extracted from the request. (Internally done by Passport)
      secretOrKey: 'TopSecretTaskManagement', // same secret as defined in auth.module.ts
    });
  }

  /*
    This is an important method which must be present here
    This payload is ALREADY VERIFIED at this point. 
    So first passport.js is going to verify the signature using the secret that we provided above (super()).
    If it's not valid, it's going to be throw an error.
    If it is valid,  it's going to call this validate() method with the payload.
  */
  async validate(payload: JwtPayload): Promise<User> {
    /*
        Here we're going to do some validation and at the end whatever we return 
        from here is going to be injected into the request of any operation that is guarded with authentication.
    */
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException(
        'User is not authorized for this operation.',
      );
    }

    return user;
  }
}
