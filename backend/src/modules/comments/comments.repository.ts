import prisma from '../../libs/prisma.js';
import type { Prisma } from '@prisma/client';

// 모든 댓글 조회 (특정요리)
export const getComments = async (findQuery: Prisma.CommentFindManyArgs) => {
  const comments = await prisma.comment.findMany({
    ...findQuery,
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return comments;
};

// 특정 댓글 조회
export const getCommentById = async (id: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return comment;
};

// 댓글 생성
export const createComment = async (createData: Prisma.CommentCreateInput) => {
  const comment = await prisma.comment.create({
    data: createData,
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return comment;
};

// 댓글 수정
export const updateComment = async (id: string, updateData: Prisma.CommentUpdateInput) => {
  const comment = await prisma.comment.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return comment;
};

// 댓글 삭제
export const deleteComment = async (id: string) => {
  return await prisma.comment.delete({
    where: { id },
  });
};

// 댓글 존재 확인
export const findComment = async (id: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  return comment;
};
