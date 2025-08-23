import prisma from '../utils/prisma.js';
import { getOneByIdOrFail } from '../utils/db.js';

// 공통 select
const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      nickname: true,
    },
  },
};

/**
 * 특정 게시물의 모든 댓글 조회
 * @param {string} dishId - 게시물 ID
 */
export const getCommentsByDish = async (dishId) => {
  // 게시물이 존재하는지 확인
  await getOneByIdOrFail(prisma.dish, dishId, '게시물');

  return prisma.comment.findMany({
    where: { dishId },
    orderBy: {
      createdAt: 'asc',
    },
    select: commentSelect,
  });
};

/**
 * 댓글 생성
 * @param {string} dishId - 게시물 ID
 * @param {string} userId - 사용자 ID
 * @param {string} content - 댓글 내용
 */
export const createComment = async (dishId, userId, content) => {
  // 게시물이 존재하는지 확인
  await getOneByIdOrFail(prisma.dish, dishId, '게시물');

  return prisma.comment.create({
    data: {
      content,
      dishId,
      userId,
    },
    select: commentSelect,
  });
};

/**
 * 댓글 수정
 * @param {string} commentId - 댓글 ID
 * @param {string} userId - 사용자 ID
 * @param {string} content - 새로운 댓글 내용
 */
export const updateComment = async (commentId, userId, content) => {
  const comment = await getOneByIdOrFail(prisma.comment, commentId, '댓글');

  if (comment.userId !== userId) {
    throw new Error('댓글을 수정할 권한이 없습니다.');
  }

  return prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
    },
    select: commentSelect,
  });
};

/**
 * 댓글 삭제
 * @param {string} commentId - 댓글 ID
 * @param {string} userId - 사용자 ID
 */
export const deleteComment = async (commentId, userId) => {
  const comment = await getOneByIdOrFail(prisma.comment, commentId, '댓글');

  if (comment.userId !== userId) {
    throw new Error('댓글을 삭제할 권한이 없습니다.');
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });
};
