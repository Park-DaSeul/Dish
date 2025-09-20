import express from 'express';
import * as authController from './auth.controller.js';
import * as authDto from './auth.dto.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const authRouter = express.Router();

// 회원가입
authRouter.post('/signup', validate(authDto.signup), asyncHandler(authController.signup));

// 로그인
authRouter.post('/login', validate(authDto.login), asyncHandler(authController.login));

export { authRouter };
