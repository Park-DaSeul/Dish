import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authValidation from '../validations/auth.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const authRouter = express.Router();

// 회원가입
authRouter.post('/signup', validate(authValidation.signup), asyncHandler(authController.signup));

// 로그인
authRouter.post('/login', validate(authValidation.login), asyncHandler(authController.login));

export { authRouter };
