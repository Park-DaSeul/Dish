import express from 'express';
import * as userController from './users.controller.js';
import { validateUpdateBody, validateDeleteBody } from './users.dto.js';
import { validateId, validateGetOffsetQuery } from '../../common/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import passport from '../../libs/passport/index.js';

const userRouter = express.Router();

// --- 여기부터 로그인 필요 ---
userRouter.use(passport.authenticate('access-token', { session: false }));

// 모든 사용자 조회
userRouter.get('/', validateGetOffsetQuery, asyncHandler(userController.getUsers));

// 특정 사용자 조회, 수정, 삭제 (/:id)
userRouter
  .route('/:id')
  .get(validateId, asyncHandler(userController.getUserById))
  .put(validateId, validateUpdateBody, asyncHandler(userController.updateUser))
  .delete(validateId, validateDeleteBody, asyncHandler(userController.deleteUser));

export { userRouter };
