import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as userValidation from '../validation/user.validation.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// 회원가입
router.post(
  '/signup',
  validate(userValidation.createUser),
  asyncHandler(userController.createUser),
);
// 로그인
router.post(
  '/login',
  validate(userValidation.loginUser),
  asyncHandler(userController.loginUser),
);

// 로그인 필요
// 아래 라우터는 모두 인증 필요
router.use(authenticate);

// 모든 유저 조회
router.get(
  '/',
  validate(userValidation.getUsers),
  asyncHandler(userController.getUsers),
);

// 특정 유저 조회, 수정, 삭제 (/:id)
router
  .route('/:id')
  .get(
    validate(userValidation.getUserById),
    asyncHandler(userController.getUserById),
  )
  .put(
    validate(userValidation.updateUser),
    asyncHandler(userController.updateUser),
  )
  .delete(
    validate(userValidation.deleteUser),
    asyncHandler(userController.deleteUser),
  );

export default router;
