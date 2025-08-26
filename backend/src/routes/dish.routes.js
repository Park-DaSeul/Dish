import express from 'express';
import * as dishController from '../controllers/dish.controller.js';
import * as dishValidation from '../validations/dish.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { dishNestedCommentRouter } from './comment.routes.js';

const dishRouter = express.Router();

// 로그인 필요
// 아래 라우터는 모두 인증 필요
dishRouter.use(authenticate);

// 모든 게시글 조회, 생성
dishRouter
  .route('/')
  .get(validate(dishValidation.getDishes), asyncHandler(dishController.getDishes))
  .post(validate(dishValidation.createDish), asyncHandler(dishController.createDish));

// 특정 게시글 조회, 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .get(validate(dishValidation.getDishById), asyncHandler(dishController.getDishById))
  .put(validate(dishValidation.updateDish), asyncHandler(dishController.updateDish))
  .delete(validate(dishValidation.deleteDish), asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', dishNestedCommentRouter);

export { dishRouter };
