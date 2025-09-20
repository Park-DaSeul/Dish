import prisma from '../../libs/prisma.js';
import { meSelect } from '../../common/index.js';

// 회원가입
export const signup = async (createData) => {
  const user = await prisma.user.create({
    data: createData,
    select: meSelect,
  });
  return user;
};

// 이메일 중복 확인
export const checkUserExistsByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};

// 로그인
