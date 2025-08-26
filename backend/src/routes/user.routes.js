import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as userValidation from '../validations/user.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const userRouter = express.Router();

// 로그인 필요
// 아래 라우터는 모두 인증 필요
userRouter.use(authenticate);

// 모든 유저 조회
userRouter.get('/', validate(userValidation.getUsers), asyncHandler(userController.getUsers));

// 특정 유저 조회, 수정, 삭제 (/:id)
userRouter
  .route('/:id')
  .get(validate(userValidation.getUserById), asyncHandler(userController.getUserById))
  .put(validate(userValidation.updateUser), asyncHandler(userController.updateUser))
  .delete(validate(userValidation.deleteUser), asyncHandler(userController.deleteUser));

export { userRouter };
