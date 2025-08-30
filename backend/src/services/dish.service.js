import prisma from '../utils/prisma.js';
import { getOneByIdOrFail, userSelect } from '../utils/index.js';

// 모든 게시글 조회
export const getDishes = async (query) => {
  const { limit = 10, cursor, search } = query;
  // limit 값을 숫자로 변환하고, 유효하지 않으면 기본값 10을 사용
  const parsedLimit = parseInt(limit, 10) || 10;
  // 페이지 네이션 커서방식
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const dishes = await prisma.dish.findMany({
    where,
    take: parsedLimit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      user: {
        select: userSelect,
      },
      comments: true,
      likes: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const lastDishInResults = dishes[parsedLimit - 1];
  const nextCursor = lastDishInResults ? lastDishInResults.id : null;

  return { dishes, nextCursor };
};

// 특정 게시글 조회
export const getDishById = async (id) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    include: {
      user: {
        select: userSelect,
      },
      comments: true,
      likes: true,
    },
  });
  if (!dish) throw new Error('게시글을 찾을 수 없습니다.');
  return dish;
};

// 게시글 생성
export const createDish = async (userId, data) => {
  const { title, description, imageUrl } = data;

  const dish = await prisma.dish.create({
    data: {
      title,
      description,
      imageUrl,
      userId,
    },
    include: {
      user: {
        select: userSelect,
      },
    },
  });
  return dish;
};

// 게시글 수정
export const updateDish = async (id, userId, data) => {
  const { title, description, imageUrl } = data;
  // 게시물이 존재하는지 확인
  const dishData = await getOneByIdOrFail(prisma.dish, id, '게시글');
  if (dishData.userId !== userId) {
    throw new Error('게시글을 수정할 권한이 없습니다.');
  }

  const updateData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(imageUrl && { imageUrl }),
  };

  const dish = await prisma.dish.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: userSelect,
      },
      comments: true,
      likes: true,
    },
  });
  return dish;
};

// 게시글 삭제
export const deleteDish = async (id, userId) => {
  // 게시물이 존재하는지 확인
  const dishData = await getOneByIdOrFail(prisma.dish, id, '게시글');
  if (dishData.userId !== userId) {
    throw new Error('게시글을 삭제할 권한이 없습니다.');
  }

  await prisma.dish.delete({
    where: { id },
  });
};
