import * as commentService from './comments.service.js';
import type {
  GetCommentsRequest,
  GetCommentByIdRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  DeleteCommentRequest,
} from './comments.dto.js';
import type { Response } from 'express';

// 모든 댓글 조회 (특정요리)
export const getComments = async (req: GetCommentsRequest, res: Response) => {
  const query = req.parsedQuery;

  const { dishId } = req.parsedParams;
  if (!dishId) throw new Error('요리 게시글 ID가 필요합니다.');

  const commentsData = await commentService.getComments(query, dishId);
  return res.json({ success: true, data: commentsData });
};

// 특정 댓글 조회
export const getCommentById = async (req: GetCommentByIdRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  const comment = await commentService.getCommentById(id);
  return res.json({ success: true, data: comment });
};

// 댓글 생성
export const createComment = async (req: CreateCommentRequest, res: Response) => {
  const { dishId } = req.parsedParams;
  if (!dishId) throw new Error('요리 게시글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.parsedBody;
  const comment = await commentService.createComment(dishId, userId, data);
  return res.status(201).json({ success: true, data: comment });
};

// 댓글 수정
export const updateComment = async (req: UpdateCommentRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  const data = req.body;
  const comment = await commentService.updateComment(id, userId, data);
  return res.json({ success: true, data: comment });
};

// 댓글 삭제
export const deleteComment = async (req: DeleteCommentRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('댓글 ID가 필요합니다.');

  if (!req.user) throw new Error('사용자 인증이 필요합니다.');
  const userId = req.user.id;

  await commentService.deleteComment(id, userId);
  return res.status(200).json({ success: true, message: '댓글이 삭제되었습니다.' });
};
