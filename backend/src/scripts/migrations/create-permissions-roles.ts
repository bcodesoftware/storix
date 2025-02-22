import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { PermissionService } from '../../permission/permission.service';
import { RoleService } from '../../role/role.service';
import { Permission } from '../../permission/permission.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const permissionService = app.get(PermissionService);
  const roleService = app.get(RoleService);

  try {
    // Create base permissions
    const permissions = await Promise.all([
      permissionService.createOrUpdatePermission({ name: 'READ_MAIL', description: 'Can read emails' } as Permission),
      permissionService.createOrUpdatePermission({ name: 'SEND_MAIL', description: 'Can send emails' } as Permission),
      permissionService.createOrUpdatePermission({ name: 'MANAGE_USERS', description: 'Can manage users' } as Permission),
      permissionService.createOrUpdatePermission({ name: 'MANAGE_ROLES', description: 'Can manage roles' } as Permission),
    ]);

    console.log('Created permissions:', permissions.map(p => p.name));

    // Create roles and assign permissions
    const adminRole = await roleService.createOrUpdateRole({
      name: 'ADMIN',
      description: 'Administrator role',
      permissions: permissions.map(p => p._id) as Permission[],
    });

    const userRole = await roleService.createOrUpdateRole({
      name: 'USER',
      description: 'Regular user role',
      permissions: permissions
        .filter(p => ['READ_MAIL', 'SEND_MAIL'].includes(p.name))
        .map(p => p._id) as Permission[],
    });

    console.log('Created roles:', [adminRole.name, userRole.name]);

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    await app.close();
    process.exit(1);
  }
}

bootstrap(); 