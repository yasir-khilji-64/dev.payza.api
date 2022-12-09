import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

export class UserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { id } = context.switchToHttp().getRequest<RequestWithUser>()?.params;
    const { user }: RequestWithUser = context
      .switchToHttp()
      .getRequest<RequestWithUser>();
    if (id === user.id) {
      return true;
    }
    return false;
  }
}
