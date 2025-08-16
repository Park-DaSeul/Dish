import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 모든 유저 조회
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// 특정 유저 조회
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// 유저 생성
export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

// 유저 수정
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// 유저 삭제
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// 로그인 (간단 예시, 실제로는 비밀번호 해싱 필요)
export const loginUser = async (email, password) => {
  return await prisma.user.findFirst({
    where: { email, password },
  });
};
