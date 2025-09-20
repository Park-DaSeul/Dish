import express from 'express';
import * as dishController from './dishes.controller.js';
import * as dishDto from './dishes.dto.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { commentRouter } from '../comments/comments.route.js';

const dishRouter = express.Router();

// 모든 요리 게시글 조회 (인증 불필요)
dishRouter.route('/').get(validate(dishDto.getDishes), asyncHandler(dishController.getDishes));

// --- 여기부터 로그인 필요 ---
dishRouter.use(authenticate);

// 요리 게시글 생성
dishRouter.route('/').post(validate(dishDto.createDish), asyncHandler(dishController.createDish));

// 특정 요리 게시글 조회, 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .get(validate(dishDto.getDishById), asyncHandler(dishController.getDishById))
  .put(validate(dishDto.updateDish), asyncHandler(dishController.updateDish))
  .delete(validate(dishDto.deleteDish), asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', commentRouter);

export { dishRouter };
