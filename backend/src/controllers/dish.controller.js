import * as dishService from '../services/dish.service.js';

// 모든 게시글 조회
export const getDishes = async (req, res) => {
  const { page, limit } = req.query;
  const dishes = await dishService.getDishes(page, limit);
  res.json({ success: true, data: dishes });
};

// 특정 게시글 조회
export const getDishById = async (req, res) => {
  const { id } = req.params;
  const dish = await dishService.getDishById(id);
  res.json({ success: true, data: dish });
};

// 게시글 생성
export const createDish = async (req, res) => {
  const data = { ...req.body, userId: req.user.id };
  const dish = await dishService.createDish(data);
  res.status(201).json({ success: true, data: dish });
};

// 게시글 수정
export const updateDish = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const dish = await dishService.updateDish(id, data);
  res.json({ success: true, data: dish });
};

// 게시글 삭제
export const deleteDish = async (req, res) => {
  const { id } = req.params;
  await dishService.deleteDish(id);
  res.json({ success: true, message: '게시글이 삭제되었습니다.' });
};
