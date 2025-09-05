import express from 'express';
import * as dishController from '../controllers/dish.controller.js';
import * as dishValidation from '../validations/dish.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { commentRouter } from './comment.route.js';
import { recipeRouter } from './recipe.route.js';
import { ingredientRouter } from './ingredient.route.js';

const dishRouter = express.Router();

// 모든 요리 게시글 조회 (인증 불필요)
dishRouter.route('/').get(validate(dishValidation.getDishes), asyncHandler(dishController.getDishes));

// --- 여기부터 로그인 필요 ---
dishRouter.use(authenticate);

// 요리 생성 게시글
dishRouter.route('/').post(validate(dishValidation.createDish), asyncHandler(dishController.createDish));

// 특정 요리 게시글 조회, 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .get(validate(dishValidation.getDishById), asyncHandler(dishController.getDishById))
  .put(validate(dishValidation.updateDish), asyncHandler(dishController.updateDish))
  .delete(validate(dishValidation.deleteDish), asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', commentRouter);
dishRouter.use('/:dishId/recipes', recipeRouter);
dishRouter.use('/:dishId/ingredients', ingredientRouter);

export { dishRouter };
