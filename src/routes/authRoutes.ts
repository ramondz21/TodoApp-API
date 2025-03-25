import { validateAuth } from '../middleware/validationMiddleware';
import express from 'express';
import { login, logout, refreshToken, register } from '../controllers/authController';

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;