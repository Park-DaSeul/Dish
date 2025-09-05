import * as dishIngredientService from '../services/dishIngredient.service.js';

// 요리에 재료 추가
export const addIngredientToDish = async (req, res) => {
  const { dishId } = req.params;
  const data = req.body;
  const userId = req.user.id;
  const dishIngredient = await dishIngredientService.addIngredientToDish(userId, dishId, data);
  res.status(201).json({ success: true, data: dishIngredient });
};

// 특정 요리의 모든 재료 조회
export const getIngredientsOfDish = async (req, res) => {
  const { dishId } = req.params;
  const dishIngredients = await dishIngredientService.getIngredientsOfDish(dishId);
  res.json({ success: true, data: dishIngredients });
};

// 요리의 특정 재료 수정
export const updateIngredientOfDish = async (req, res) => {
  const { dishId, ingredientId } = req.params;
  const data = req.body;
  const userId = req.user.id;
  const dishIngredient = await dishIngredientService.updateIngredientOfDish(userId, dishId, ingredientId, data);
  res.json({ success: true, data: dishIngredient });
};

// 요리에서 재료 삭제
export const removeIngredientFromDish = async (req, res) => {
  const { dishId, ingredientId } = req.params;
  const userId = req.user.id;
  await dishIngredientService.removeIngredientFromDish(userId, dishId, ingredientId);
  res.status(200).json({ success: true, message: '요리에서 재료가 삭제되었습니다.' });
};
