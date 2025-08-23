import express from 'express';
import * as dishController from '../controllers/dish.controller.js';
import * as dishValidation from '../validation/dish.validation.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// 로그인 필요
// 아래 라우터는 모두 인증 필요
router.use(authenticate);

// 모든 게시글 조회, 생성
router
  .route('/')
  .get(
    validate(dishValidation.getDishes),
    asyncHandler(dishController.getDishes),
  )
  .post(
    validate(dishValidation.createDish),
    asyncHandler(dishController.createDish),
  );

// 특정 게시글 조회, 수정, 삭제 (/:id)
router
  .route('/:id')
  .get(
    validate(dishValidation.getDishById),
    asyncHandler(dishController.getDishById),
  )
  .put(
    validate(dishValidation.updateDish),
    asyncHandler(dishController.updateDish),
  )
  .delete(
    validate(dishValidation.deleteDish),
    asyncHandler(dishController.deleteDish),
  );

export default router;
