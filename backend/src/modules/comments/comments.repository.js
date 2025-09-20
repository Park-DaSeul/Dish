import prisma from '../../libs/prisma.js';
import { commentSelect } from '../../common/index.js';

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
    select: commentSelect,
  });

  return comment;
};

// 댓글 생성
export const createComment = async (createData) => {
  const comment = await prisma.comment.create({
    data: createData,
    select: commentSelect,
  });

  return comment;
};
// 댓글 수정
export const updateComment = async (id, updateData) => {
  const comment = await prisma.comment.update({
    where: { id },
    data: updateData,
    select: commentSelect,
  });

  return comment;
};

// 댓글 삭제
export const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: { id },
  });
};

// 댓글 존재 확인
export const findComment = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  return comment;
};
