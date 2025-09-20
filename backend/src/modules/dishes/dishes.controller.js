import * as dishService from './dishes.service.js';

// 모든 요리 게시물 조회
export const getDishes = async (req, res) => {
  const query = req.query;

  const dishes = await dishService.getDishes(query);
  return res.json({ success: true, data: dishes });
};

// 특정 요리 게시물 조회
export const getDishById = async (req, res) => {
  const { id } = req.params;

  const dish = await dishService.getDishById(id);
  return res.json({ success: true, data: dish });
};

// 요리 게시물 생성
export const createDish = async (req, res) => {
  const userId = req.user.id;

  const data = req.body;
  const dish = await dishService.createDish(userId, data);
  return res.status(201).json({ success: true, data: dish });
};

// 요리 게시물 수정
export const updateDish = async (req, res) => {
  const { id } = req.params;

  const userId = req.user.id;

  const data = req.body;
  const dish = await dishService.updateDish(id, userId, data);
  return res.json({ success: true, data: dish });
};

// 요리 게시물 삭제
export const deleteDish = async (req, res) => {
  const { id } = req.params;

  const userId = req.user.id;

  await dishService.deleteDish(id, userId);
  return res.status(200).json({ success: true, message: '요리 게시글이 삭제되었습니다.' });
};
