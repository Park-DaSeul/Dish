import prisma from '../utils/prisma.js';
import { getOneByIdOrFail, commentSelect } from '../utils/index.js';

// 모든 댓글 조회 (특정요리)
export const getComments = async (dishId) => {
  const comments = await prisma.comment.findMany({
    where: { dishId },
    orderBy: {
      createdAt: 'asc',
    },
    select: commentSelect,
  });
  return comments;
};

// 특정 댓글 조회
export const getCommentById = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  if (!comment) throw new Error('댓글을 찾을 수 없습니다.');
  return comment;
};

// 댓글 생성
export const createComment = async (dishId, userId, data) => {
  const { content } = data;

  const comment = await prisma.comment.create({
    data: {
      content,
      dishId,
      userId,
    },
    select: commentSelect,
  });
  return comment;
};

// 댓글 수정
export const updateComment = async (id, userId, data) => {
  const { content } = data;
  // 댓글이 존재하는지 확인
  const commentData = await getOneByIdOrFail(prisma.comment, id, '댓글');
  if (commentData.userId !== userId) {
    throw new Error('댓글을 수정할 권한이 없습니다.');
  }

  const updateData = {
    ...(content && { content }),
  };

  const comment = await prisma.comment.update({
    where: { id },
    data: updateData,
    select: commentSelect,
  });
  return comment;
};

// 댓글 삭제
export const deleteComment = async (id, userId) => {
  // 댓글이 존재하는지 확인
  const commentData = await getOneByIdOrFail(prisma.comment, id, '댓글');
  if (commentData.userId !== userId) {
    throw new Error('댓글을 삭제할 권한이 없습니다.');
  }

  await prisma.comment.delete({
    where: { id },
  });
};
