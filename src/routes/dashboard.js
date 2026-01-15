const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { isAuthenticated, ADMIN_ROLES } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Dashboard route - redirects to appropriate dashboard based on role
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const isAdmin = ADMIN_ROLES.includes(req.session.userRole);

        if (isAdmin) {
            // Admin view: get all employees and their tasks
            const employees = await prisma.user.findMany({
                where: {
                    role: {
                        name: 'EMPLOYEE'
                    }
                },
                include: {
                    tasks: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
                orderBy: {
                    name: 'asc'
                }
            });

            res.render('admin-dashboard', {
                userName: req.session.userName,
                userRole: req.session.userRole,
                employees
            });
        } else {
            // Employee view: get only their tasks
            const tasks = await prisma.task.findMany({
                where: {
                    assignedToId: req.session.userId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            res.render('employee-dashboard', {
                userName: req.session.userName,
                userRole: req.session.userRole,
                tasks
            });
        }
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
