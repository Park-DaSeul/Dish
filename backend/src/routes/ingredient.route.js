import express from 'express';
import * as ingredientController from '../controllers/ingredient.controller.js';
import * as ingredientValidation from '../validations/ingredient.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const ingredientRouter = express.Router();

// 모든 재료 조회 (인증 불필요)
ingredientRouter.route('/').get(validate(ingredientValidation.getIngredients), asyncHandler(ingredientController.getIngredients));

// --- 여기부터 로그인 필요 ---
ingredientRouter.use(authenticate);

// 재료 생성
ingredientRouter.route('/').post(validate(ingredientValidation.createIngredient), asyncHandler(ingredientController.createIngredient));

// 특정 재료 조회, 수정, 삭제 (/:id)
ingredientRouter
  .route('/:id')
  .get(validate(ingredientValidation.getIngredientById), asyncHandler(ingredientController.getIngredientById))
  .put(validate(ingredientValidation.updateIngredient), asyncHandler(ingredientController.updateIngredient))
  .delete(validate(ingredientValidation.deleteIngredient), asyncHandler(ingredientController.deleteIngredient));

export { ingredientRouter };
