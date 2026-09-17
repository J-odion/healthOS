import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Seed Roles
  const roles = [
    'Patient', 'FrontDesk', 'Nurse', 'Doctor', 'Pharmacist', 
    'LabStaff', 'BillingOfficer', 'StoreOfficer', 'FinanceAdmin', 
    'MedicalDirector', 'ITAdmin'
  ];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, description: `${roleName} role` },
    });
  }

  // Seed Permissions
  const permissions = [
    'department:create', 'department:read', 'department:update', 'department:delete',
    'patient:create', 'patient:read', 'patient:update', 'patient:delete',
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm },
      update: {},
      create: { name: perm },
    });
  }

  // Assign department permissions to ITAdmin and MedicalDirector for test
  const adminRole = await prisma.role.findUnique({ where: { name: 'ITAdmin' } });
  const allPerms = await prisma.permission.findMany();
  
  if (adminRole) {
    for (const perm of allPerms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: perm.id },
      });
    }
  }

  // Seed initial IT Admin user
  const adminPassword = await argon2.hash('Admin@123!');
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPassword,
      isActive: true,
    },
  });

  // Seed default department
  const generalDept = await prisma.department.upsert({
    where: { name: 'General Department' },
    update: {},
    create: { name: 'General Department', description: 'General Purpose Department' },
  });

  // Associate Staff with IT Admin
  await prisma.staff.upsert({
    where: { email: 'admin@hospios.local' },
    update: {},
    create: {
      userId: adminUser.id,
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@hospios.local',
      departmentId: generalDept.id,
      roleId: adminRole!.id,
    }
  });

  // Create default users for ALL other roles
  const defaultPassword = await argon2.hash('Password@123!');
  
  for (const roleName of roles) {
    if (roleName === 'ITAdmin' || roleName === 'Patient') continue; // Skip admin (already created) and Patient (not staff)

    const username = roleName.toLowerCase();
    const email = `${username}@hospios.local`;

    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        passwordHash: defaultPassword,
        isActive: true,
      },
    });

    const roleRecord = await prisma.role.findUnique({ where: { name: roleName } });
    if (roleRecord) {
      await prisma.staff.upsert({
        where: { email },
        update: {},
        create: {
          userId: user.id,
          firstName: 'Default',
          lastName: roleName,
          email,
          departmentId: generalDept.id,
          roleId: roleRecord.id,
        }
      });
    }
  }

  console.log('Seeding completed. Default password is: Password@123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
