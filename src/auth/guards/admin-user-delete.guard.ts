import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'src/users/entities/user-roles.enum';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

export class AdminUserDeleteGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    const { id } = context.switchToHttp().getRequest<RequestWithUser>()?.params;
    if (user.role === UserRoles.ADMIN) {
      return true;
    } else if (id === user.id) {
      return true;
    }
    return false;
  }
}
