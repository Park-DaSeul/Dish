import * as recipeService from '../services/recipe.service.js';

// 모든 레시피 조회 (특정요리)
export const getRecipes = async (req, res) => {
  const { dishId } = req.params;
  const recipes = await recipeService.getRecipes(dishId);
  res.json({ success: true, data: recipes });
};

// 특정 레시피 조회
export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);
  res.json({ success: true, data: recipe });
};

// 레시피 생성
export const createRecipe = async (req, res) => {
  const { dishId } = req.params;
  const data = req.body;
  const userId = req.user.id;
  const recipe = await recipeService.createRecipe(dishId, userId, data);
  res.status(201).json({ success: true, data: recipe });
};

// 레시피 수정
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const userId = req.user.id;
  const recipe = await recipeService.updateRecipe(id, userId, data);
  res.json({ success: true, data: recipe });
};

// 레시피 삭제
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await recipeService.deleteRecipe(id, userId);
  res.status(200).json({ success: true, message: '레시피가 삭제되었습니다.' });
};
