import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

/*
    Creating custom decorator to extract the user from the request object 
    and we're going to use that quite a bit.
    
    Ignoring data because we are not going to call this decorator with any data.

    whatever we return from this function is going to be set with the parameter 
    that is decorated with this decorator.

    This will be called as @GetUser() in the parameter
*/
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    // user is present in the requst because after successful authentication,
    // we are storing the user in the request. See JwtStrategy.validate() function
    return req.user;
  },
);
