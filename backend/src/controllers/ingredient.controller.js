import * as ingredientService from '../services/ingredient.service.js';

// 모든 재료 조회 (특정요리)
export const getIngredients = async (req, res) => {
  const { dishId } = req.params;
  const ingredients = await ingredientService.getIngredients(dishId);
  res.json({ success: true, data: ingredients });
};

// 특정 재료 조회
export const getIngredientById = async (req, res) => {
  const { id } = req.params;
  const ingredient = await ingredientService.getIngredientById(id);
  res.json({ success: true, data: ingredient });
};

// 재료 생성
export const createIngredient = async (req, res) => {
  const { dishId } = req.params;
  const userId = req.user.id;
  const data = req.body;
  const ingredient = await ingredientService.createIngredient(dishId, userId, data);
  res.status(201).json({ success: true, data: ingredient });
};

// 재료 수정
export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = req.body;
  const ingredient = await ingredientService.updateIngredient(id, userId, data);
  res.json({ success: true, data: ingredient });
};

// 재료 삭제
export const deleteIngredient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await ingredientService.deleteIngredient(id, userId);
  res.status(200).json({ success: true, message: '재료가 삭제되었습니다.' });
};
