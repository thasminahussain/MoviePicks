import express from 'express';
import User from '../models/User.js';

const router = new express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const emailInUse = await User.findOne({ email: req.body.email });
        const usernameInUse = await User.findOne({ username: req.body.username });

        if (emailInUse) {
            return res.status(400).send("Email is already in use!");
        }

        if (usernameInUse) {
            return res.status(400).send("Username is already in use!");
        }

        const newUser = await User.create(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Authenticate existing user
router.post('/signin', async (req, res) => {
    try {
        const dbUser = await User.findOne({ email: req.body.email });

        if (!dbUser) {
            return res.status(400).send("Wrong email!");
        }

        if (dbUser.password !== req.body.password) {
            return res.status(400).send("Wrong password!");
        }

        res.send(dbUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;




