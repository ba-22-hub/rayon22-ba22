const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('API is running ✅');
});

// Register user (with full form data)
app.post('/api/register', async (req, res) => {
    try {
        const {
            gender,
            firstName,
            lastName,
            birthday,
            phone,
            email,
            password,
            address,
            addAddress,
            city,
            postalCode,
            situation,
            quotient,
            wageType,
            otherWage,
            readInfo,
            acceptTerms,
        } = req.body;

        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Email already used' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const user = await prisma.user.create({
            data: {
                gender,
                firstName,
                lastName,
                birthday: birthday ? new Date(birthday) : null,
                phone,
                email,
                password: hashedPassword,
                address,
                addAddress,
                city,
                postalCode,
                situation,
                quotient,
                wageType,
                otherWage,
                readInfo: !!readInfo,
                acceptTerms: !!acceptTerms,
            },
        });

        res.status(201).json({ message: 'User registered', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            token,
            user: {
                id: user.id,
                gender: user.gender,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected profile route
app.get('/api/profile', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);

    const token = auth.split(' ')[1];
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                gender: true,
                firstName: true,
                lastName: true,
                birthday: true,
                phone: true,
                email: true,
                address: true,
                addAddress: true,
                city: true,
                postalCode: true,
                situation: true,
                quotient: true,
                wageType: true,
                otherWage: true,
                readInfo: true,
                acceptTerms: true,
                createdAt: true,
            },
        });
        res.json({ user });
    } catch {
        res.sendStatus(403);
    }
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
