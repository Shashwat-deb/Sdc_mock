const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create roles
    const roles = await Promise.all([
        prisma.role.upsert({
            where: { name: 'EMPLOYEE' },
            update: {},
            create: { name: 'EMPLOYEE' }
        }),
        prisma.role.upsert({
            where: { name: 'SUPERVISOR' },
            update: {},
            create: { name: 'SUPERVISOR' }
        }),
        prisma.role.upsert({
            where: { name: 'MANAGER' },
            update: {},
            create: { name: 'MANAGER' }
        }),
        prisma.role.upsert({
            where: { name: 'HR' },
            update: {},
            create: { name: 'HR' }
        })
    ]);

    const [employeeRole, supervisorRole, managerRole, hrRole] = roles;

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create users
    const supervisor = await prisma.user.upsert({
        where: { email: 'supervisor@mujsdc.in' },
        update: {},
        create: {
            email: 'supervisor@mujsdc.in',
            password: hashedPassword,
            name: 'Rajesh Kumar',
            roleId: supervisorRole.id
        }
    });

    const manager = await prisma.user.upsert({
        where: { email: 'manager@mujsdc.in' },
        update: {},
        create: {
            email: 'manager@mujsdc.in',
            password: hashedPassword,
            name: 'Anita Sharma',
            roleId: managerRole.id
        }
    });

    const hr = await prisma.user.upsert({
        where: { email: 'hr@mujsdc.in' },
        update: {},
        create: {
            email: 'hr@mujsdc.in',
            password: hashedPassword,
            name: 'Vikram Singh',
            roleId: hrRole.id
        }
    });

    const employee1 = await prisma.user.upsert({
        where: { email: 'shashwat@mujsdc.in' },
        update: {},
        create: {
            email: 'shashwat@mujsdc.in',
            password: hashedPassword,
            name: 'Shashwat',
            roleId: employeeRole.id
        }
    });

    const employee2 = await prisma.user.upsert({
        where: { email: 'shivansh@mujsdc.in' },
        update: {},
        create: {
            email: 'shivansh@mujsdc.in',
            password: hashedPassword,
            name: 'Shivansh',
            roleId: employeeRole.id
        }
    });

    // Create tasks for employees
    await prisma.task.deleteMany({});

    await prisma.task.createMany({
        data: [
            // Tasks for Shashwat
            {
                title: 'Complete project report',
                description: 'Prepare and submit the quarterly project report',
                status: 'IN_PROGRESS',
                assignedToId: employee1.id
            },
            {
                title: 'Review documentation',
                description: 'Review and update project documentation',
                status: 'PENDING',
                assignedToId: employee1.id
            },
            {
                title: 'Client presentation',
                description: 'Prepare presentation for client meeting',
                status: 'COMPLETED',
                assignedToId: employee1.id
            },
            // Tasks for Shivansh
            {
                title: 'Code review',
                description: 'Review pull requests from the team',
                status: 'IN_PROGRESS',
                assignedToId: employee2.id
            },
            {
                title: 'Bug fixes',
                description: 'Fix critical bugs reported by QA',
                status: 'PENDING',
                assignedToId: employee2.id
            },
            {
                title: 'Unit testing',
                description: 'Write unit tests for new features',
                status: 'COMPLETED',
                assignedToId: employee2.id
            }
        ]
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
