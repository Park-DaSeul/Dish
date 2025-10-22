import express from 'express';
import prisma from '../../libs/prisma.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { validateGetQuery, validateUpdateBody, validateDeleteBody } from './user.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const userRouter = express.Router();

// 의존성 주입
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// --- 여기부터 로그인 필요 ---
userRouter.use(authenticate);

// 모든 사용자 조회
userRouter.get('/', validateGetQuery, asyncHandler(userController.getUsers));

// 특정 사용자 조회, 수정, 삭제 (/:id)
userRouter
  .route('/me')
  .get(asyncHandler(userController.getUserById))
  .put(validateUpdateBody, asyncHandler(userController.updateUser))
  .delete(validateDeleteBody, asyncHandler(userController.deleteUser));

export { userRouter };
