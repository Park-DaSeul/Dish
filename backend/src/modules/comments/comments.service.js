import * as commentRepository from './comments.repository.js';
import * as dishRepository from './dishes.repository.js';

// 모든 댓글 조회 (특정요리)
export const getComments = async (dishId) => {
  const comments = await commentRepository.getComments(dishId);

  return comments;
};

// 특정 댓글 조회
export const getCommentById = async (id) => {
  const comment = await commentRepository.getCommentById(id);
  if (!comment) throw new Error('댓글을 찾을 수 없습니다.');

  return comment;
};

// 댓글 생성
export const createComment = async (dishId, userId, data) => {
  const { content } = data;

  // 요리 게시글 존재 확인
  const dishData = await dishRepository.findDish(dishId);
  if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');

  const createData = {
    content,
    dishId,
    userId,
  };

  const comment = await commentRepository.createComment(createData);

  return comment;
};

// 댓글 수정
export const updateComment = async (id, userId, data) => {
  const { content } = data;

  // 댓글 존재 확인
  const commentData = await commentRepository.findComment(id);
  if (!commentData) throw new Error('댓글을 찾을 수 없습니다.');
  if (commentData.userId !== userId) throw new Error('댓글을 수정할 권한이 없습니다.');

  const updateData = {
    ...(content && { content }),
  };

  const comment = await commentRepository.updateComment(id, updateData);

  return comment;
};

// 댓글 삭제
export const deleteComment = async (id, userId) => {
  // 댓글 존재 확인
  const commentData = await commentRepository.findComment(id);
  if (!commentData) throw new Error('댓글을 찾을 수 없습니다.');
  if (commentData.userId !== userId) throw new Error('댓글을 삭제할 권한이 없습니다.');

  return await commentRepository.deleteComment(id);
};
