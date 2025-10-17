import prisma from '../../libs/prisma.js';
import type { Prisma } from '@prisma/client';

// 모든 사용자 조회
export const getUsers = async (getQuery: Prisma.UserFindManyArgs) => {
  const users = await prisma.user.findMany({
    ...getQuery,
    select: {
      id: true,
      name: true,
      nickname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

// 특정 사용자 조회
export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      nickname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

// 사용자 수정
export const updateUser = async (id: string, updateData: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      nickname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

// 사용자 삭제
export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// 사용자 확인
export const findUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};
