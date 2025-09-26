import * as commentService from './comments.service.js';
import type { Request, Response } from 'express';

// 모든 댓글 조회 (특정요리)
export const getComments = async (req: Request, res: Response) => {
  const { query } = req;

  const { dishId } = req.params;
  if (!dishId) throw new Error('요리 ID가 필요합니다.');

  const comments = await commentService.getComments(query, dishId);
  return res.json({ success: true, data: comments });
};

// 특정 댓글 조회
export const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  const comment = await commentService.getCommentById(id);
  return res.json({ success: true, data: comment });
};

// 댓글 생성
export const createComment = async (req: Request, res: Response) => {
  const { dishId } = req.params;
  if (!dishId) throw new Error('요리 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.body;
  const comment = await commentService.createComment(dishId, userId, data);
  return res.status(201).json({ success: true, data: comment });
};

// 댓글 수정
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.body;
  const comment = await commentService.updateComment(id, userId, data);
  return res.json({ success: true, data: comment });
};

// 댓글 삭제
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  await commentService.deleteComment(id, userId);
  return res.status(200).json({ success: true, message: '댓글이 삭제되었습니다.' });
};
