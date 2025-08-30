import * as dishService from '../services/dish.service.js';

// 모든 게시글 조회
export const getDishes = async (req, res) => {
  const query = req.query;
  const dishes = await dishService.getDishes(query);
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
  const data = req.body;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  const dish = await dishService.createDish(userId, data);
  res.status(201).json({ success: true, data: dish });
};

// 게시글 수정
export const updateDish = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  const dish = await dishService.updateDish(id, userId, data);
  res.json({ success: true, data: dish });
};

// 게시글 삭제
export const deleteDish = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  await dishService.deleteDish(id, userId);
  res.status(200).json({ success: true, message: '게시글이 삭제되었습니다.' });
};
