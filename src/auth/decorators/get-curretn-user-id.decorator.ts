import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { JwtPayload } from '../../auth/types';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    return user.sub;
  },
);