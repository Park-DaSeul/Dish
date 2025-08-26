import * as commentService from '../services/comment.service.js';

// 특정 게시물의 모든 댓글 조회
export const getComments = async (req, res) => {
  const { dishId } = req.params;
  const comments = await commentService.getComments(dishId);
  res.json({ success: true, data: comments });
};

// 특정 댓글 조회
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await commentService.getCommentById(id);
  res.json({ success: true, data: comment });
};

// 댓글 생성
export const createComment = async (req, res) => {
  const { dishId } = req.params;
  const data = req.body;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  const comment = await commentService.createComment(dishId, userId, data);
  res.status(201).json({ success: true, data: comment });
};

// 댓글 수정
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  const comment = await commentService.updateComment(id, userId, body);
  res.json({ success: true, data: comment });
};

// 댓글 삭제
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // 인증 미들웨어에서 설정된 사용자 ID
  await commentService.deleteComment(id, userId);
  res.status(200).json({ success: true, message: '댓글이 삭제되었습니다.' });
};
