import express from 'express';
import * as userController from './users.controller.js';
import * as userDto from './users.dto.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const userRouter = express.Router();

// --- 여기부터 로그인 필요 ---
userRouter.use(authenticate);

// 모든 사용자 조회
userRouter.get('/', validate(userDto.getUsers), asyncHandler(userController.getUsers));

// 특정 사용자 조회, 수정, 삭제 (/:id)
userRouter
  .route('/:id')
  .get(validate(userDto.getUserById), asyncHandler(userController.getUserById))
  .put(validate(userDto.updateUser), asyncHandler(userController.updateUser))
  .delete(validate(userDto.deleteUser), asyncHandler(userController.deleteUser));

export { userRouter };
