import prisma from '../utils/prisma.js';
import { getOneByIdOrFail, userSelect, dishSelect } from '../utils/index.js';

// 모든 요리 게시글 조회
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
    select: dishSelect,
    orderBy: { createdAt: 'desc' },
  });

  const lastDishInResults = dishes[parsedLimit - 1];
  const nextCursor = lastDishInResults ? lastDishInResults.id : null;

  return { dishes, nextCursor };
};

// 특정 요리 게시글 조회
export const getDishById = async (id) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    select: dishSelect,
  });
  if (!dish) throw new Error('요리 게시글을 찾을 수 없습니다.');

  return dish;
};

// 요리 게시글 생성
export const createDish = async (userId, data) => {
  const { title, description, imageUrl, recipes, ingredients } = data;

  const dish = await prisma.dish.create({
    data: {
      title,
      description,
      imageUrl,
      userId,
      recipes: {
        createMany: {
          data: recipes.map((recipe) => ({
            stepNumber: recipe.stepNumber,
            instruction: recipe.instruction,
            imageUrl: recipe.imageUrl,
            userId,
          })),
        },
      },
      ingredients: {
        create: ingredients.map((ingredient) => ({
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          ingredient: {
            connectOrCreate: {
              where: { name: ingredient.name },
              create: { name: ingredient.name },
            },
          },
        })),
      },
    },
    select: dishSelect,
  });

  return dish;
};

// 요리 게시글 수정
export const updateDish = async (id, userId, data) => {
  const { title, description, imageUrl, recipes, ingredients } = data;
  // 게시글이 존재하는지 확인
  const dishData = await getOneByIdOrFail(prisma.dish, id, '요리 게시글');
  if (dishData.userId !== userId) {
    throw new Error('요리 게시글을 수정할 권한이 없습니다.');
  }

  const updatedDish = await prisma.$transaction(async (tx) => {
    await tx.dishIngredient.deleteMany({ where: { dishId: id } });
    await tx.recipe.deleteMany({ where: { dishId: id } });

    return tx.dish.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        userId,
        recipes: {
          createMany: {
            data: recipes.map((recipe) => ({
              stepNumber: recipe.stepNumber,
              instruction: recipe.instruction,
              imageUrl: recipe.imageUrl,
              userId,
            })),
          },
        },
        ingredients: {
          create: ingredients.map((ingredient) => ({
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ingredient.name },
                create: { name: ingredient.name },
              },
            },
          })),
        },
      },
      select: dishSelect,
    });
  });

  return updatedDish;
};

// 요리 게시글 삭제
export const deleteDish = async (id, userId) => {
  // 게시글이 존재하는지 확인
  const dishData = await getOneByIdOrFail(prisma.dish, id, '요리 게시글');
  if (dishData.userId !== userId) {
    throw new Error('요리 게시글을 삭제할 권한이 없습니다.');
  }

  await prisma.dish.delete({
    where: { id },
  });
};
