import prisma from '../utils/prisma.js';
import {
  getOneByIdOrFail,
  verifyPassword,
  hashPassword,
  userSelect,
} from '../utils/index.js';

// 모든 유저 조회
export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: userSelect,
  });
  return users;
};

// 특정 유저 조회
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');
  return user;
};

// 유저 수정
export const updateUser = async (id, data) => {
  const { name, nickname, password, newPassword } = data;
  // 유저가 존재하는지 확인
  const userData = await getOneByIdOrFail(prisma.user, id, '사용자');
  if (userData.id !== id) {
    throw new Error('사용자를 삭제할 권한이 없습니다.');
  }
  await verifyPassword(password, userData.password);

  const updateData = {
    ...(name && { name }),
    ...(nickname && { nickname }),
    // 비밀번호 해시 처리
    ...(newPassword && { password: await hashPassword(newPassword) }),
  };

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelect,
  });
  return user;
};

// 유저 삭제
export const deleteUser = async (id, data) => {
  const { password } = data;
  // 유저가 존재하는지 확인
  const userData = await getOneByIdOrFail(prisma.user, id, '사용자');
  if (userData.id !== id) {
    throw new Error('사용자를 삭제할 권한이 없습니다.');
  }
  await verifyPassword(password, userData.password);

  await prisma.user.delete({
    where: { id },
  });
};