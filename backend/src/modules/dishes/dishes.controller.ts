import * as dishService from './dishes.service.js';
import type {
  GetDishesRequest,
  GetDishByIdRequest,
  CreateDishRequest,
  UpdateDishRequest,
  deleteDishRequest,
} from './dishes.dto.js';
import type { Response } from 'express';

// 모든 요리 게시물 조회
export const getDishes = async (req: GetDishesRequest, res: Response) => {
  const query = req.parsedQuery;

  const dishesData = await dishService.getDishes(query);
  return res.json({ success: true, data: dishesData });
};

// 특정 요리 게시물 조회
export const getDishById = async (req: GetDishByIdRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('요리 게시글 ID가 필요합니다.');

  const dish = await dishService.getDishById(id);
  return res.json({ success: true, data: dish });
};

// 요리 게시물 생성
export const createDish = async (req: CreateDishRequest, res: Response) => {
  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.parsedBody;
  const dish = await dishService.createDish(userId, data);
  return res.status(201).json({ success: true, data: dish });
};

// 요리 게시물 수정
export const updateDish = async (req: UpdateDishRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('요리 게시글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.parsedBody;
  const dish = await dishService.updateDish(id, userId, data);
  return res.json({ success: true, data: dish });
};

// 요리 게시물 삭제
export const deleteDish = async (req: deleteDishRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('요리 게시글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  await dishService.deleteDish(id, userId);
  return res.status(200).json({ success: true, message: '요리 게시글이 삭제되었습니다.' });
};
