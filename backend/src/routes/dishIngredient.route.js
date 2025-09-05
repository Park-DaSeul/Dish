import express from 'express';
import * as dishIngredientController from '../controllers/dishIngredient.controller.js';
import * as dishIngredientValidation from '../validations/dishIngredient.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const dishNestedDishIngredientRouter = express.Router({ mergeParams: true });

// --- 여기부터 로그인 필요 ---
dishNestedDishIngredientRouter.use(authenticate);

// 재료 추가, 특정 요리의 모든 재료 조회
dishNestedDishIngredientRouter
  .route('/')
  .post(validate(dishIngredientValidation.addIngredientToDish), asyncHandler(dishIngredientController.addIngredientToDish))
  .get(validate(dishIngredientValidation.getIngredientsOfDish), asyncHandler(dishIngredientController.getIngredientsOfDish));

// 특정 재료 수정, 삭제 (/:ingredientId)
dishNestedDishIngredientRouter
  .route('/:ingredientId')
  .put(validate(dishIngredientValidation.updateIngredientOfDish), asyncHandler(dishIngredientController.updateIngredientOfDish))
  .delete(validate(dishIngredientValidation.removeIngredientFromDish), asyncHandler(dishIngredientController.removeIngredientFromDish));

export { dishNestedDishIngredientRouter };
