import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'src/users/entities/user-roles.enum';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    if (user.role === UserRoles.ADMIN) {
      return true;
    }
    return false;
  }
}
