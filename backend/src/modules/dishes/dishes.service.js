import * as dishRepository from './dishes.repository.js';

// 모든 요리 게시글 조회
export const getDishes = async (query) => {
  const { limit: take = 10, cursor, search } = query;

  // 페이지 네이션 커서방식
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const queryData = {
    where,
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  };
  const dishes = await dishRepository.getDishes(queryData);

  const lastDishInResults = dishes[parsedLimit - 1];
  const nextCursor = lastDishInResults ? lastDishInResults.id : null;

  return { dishes, nextCursor };
};

// 특정 요리 게시글 조회
export const getDishById = async (id) => {
  const dish = await dishRepository.getDishById(id);
  if (!dish) throw new Error('요리 게시글을 찾을 수 없습니다.');

  return dish;
};

// 요리 게시글 생성
export const createDish = async (userId, data) => {
  const { title, description, imageUrl, recipes, ingredients } = data;

  const createData = {
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
  };
  const dish = await dishRepository.createDish(createData);

  return dish;
};

// 요리 게시글 수정
export const updateDish = async (id, userId, data) => {
  const { title, description, imageUrl, recipes, ingredients } = data;

  // 요리 게시글 존재 확인
  const dishData = await dishRepository.findDish(id);
  if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');
  if (dishData.userId !== userId) throw new Error('요리 게시글을 수정할 권한이 없습니다.');

  const updateData = {
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
  };
  const updatedDish = await dishRepository.updateDish(id, updateData);

  return updatedDish;
};

// 요리 게시글 삭제
export const deleteDish = async (id, userId) => {
  // 요리 게시글 존재 확인
  const dishData = await dishRepository.findDish(id);
  if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');
  if (dishData.userId !== userId) throw new Error('요리 게시글을 삭제할 권한이 없습니다.');

  return await dishRepository.deleteDish(id);
};
