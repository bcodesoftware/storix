import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { Role } from 'src/role/role.schema';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //get the required permission from the decorator
    const requriedPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no permissions are required, allow access
    if (!requriedPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // The AuthGuard has already verified the JWT and attached the user
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    //get users roles array from the user.roles field, and get the permissions of each role by querying the role collection
    const permissions = await Promise.all(user.roles.map(async (roleId) => {
      const role = await this.roleService.getRoleById(roleId);
      return role.permissions;
    }));

    // check if the user has the required permission
    const hasPermission = permissions.flatMap(permission => permission.map(p => p.name)).some(permission => requriedPermissions.includes(permission));

    if (!hasPermission) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }
} 