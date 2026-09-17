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
  const itDept = await prisma.department.upsert({
    where: { name: 'IT Department' },
    update: {},
    create: { name: 'IT Department', description: 'Information Technology' },
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
      departmentId: itDept.id,
      roleId: adminRole!.id,
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
