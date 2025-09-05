import express from 'express';
import * as recipeController from '../controllers/recipe.controller.js';
import * as recipeValidation from '../validations/recipe.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// const dishNestedRecipeRouter = express.Router({ mergeParams: true });
const recipeRouter = express.Router({ mergeParams: true });

// --- 여기부터 로그인 필요 ---
recipeRouter.use(authenticate);

// 레시피 생성, 특정 요리의 모든 레시피 조회
recipeRouter
  .route('/')
  .post(validate(recipeValidation.createRecipe), asyncHandler(recipeController.createRecipe))
  .get(validate(recipeValidation.getRecipes), asyncHandler(recipeController.getRecipes));

// 특정 레시피 조회, 수정, 삭제 (/:id)
recipeRouter
  .route('/:id')
  .get(validate(recipeValidation.getRecipeById), asyncHandler(recipeController.getRecipeById))
  .put(validate(recipeValidation.updateRecipe), asyncHandler(recipeController.updateRecipe))
  .delete(validate(recipeValidation.deleteRecipe), asyncHandler(recipeController.deleteRecipe));

export { recipeRouter };
