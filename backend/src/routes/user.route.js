import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as userValidation from '../validations/user.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRouter = express.Router();

// --- 여기부터 로그인 필요 ---
userRouter.use(authenticate);

// 모든 사용자 조회
userRouter.get('/', validate(userValidation.getUsers), asyncHandler(userController.getUsers));

// 특정 사용자 조회, 수정, 삭제 (/:id)
userRouter
  .route('/:id')
  .get(validate(userValidation.getUserById), asyncHandler(userController.getUserById))
  .put(validate(userValidation.updateUser), asyncHandler(userController.updateUser))
  .delete(validate(userValidation.deleteUser), asyncHandler(userController.deleteUser));

export { userRouter };
