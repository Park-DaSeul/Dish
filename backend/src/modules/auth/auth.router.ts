import express from 'express';
import prisma from '../../libs/prisma.js';
import { AuthRepository } from './auth.repository.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { validateSignupBody, validateloginBody, validateRefreshBody } from './auth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { localAuthenticate, refreshTokenAuthenticate, authenticate } from '../../middlewares/auth.middleware.js';

const authRouter = express.Router();

// 의존성 주입
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// 회원가입
authRouter.post('/signup', validateSignupBody, asyncHandler(authController.signup));

// 로그인
authRouter.post('/login', localAuthenticate, validateloginBody, asyncHandler(authController.login));

// 토큰 재발급
authRouter.post('/refresh', refreshTokenAuthenticate, validateRefreshBody, asyncHandler(authController.refresh));

// 로그아웃
authRouter.post('/logout', authenticate, asyncHandler(authController.logout));

export { authRouter };
