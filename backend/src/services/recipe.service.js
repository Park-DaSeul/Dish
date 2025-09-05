import prisma from '../utils/prisma.js';
import { getOneByIdOrFail, recipeSelect } from '../utils/index.js';

// 모든 레시피 조회 (특정요리)
export const getRecipes = async (dishId) => {
  const recipes = await prisma.recipe.findMany({
    where: { dishId },
    orderBy: {
      stepNumber: 'asc',
    },
    select: recipeSelect,
  });
  return recipes;
};

// 특정 레시피 조회
export const getRecipeById = async (id) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  if (!recipe) throw new Error('레시피를 찾을 수 없습니다.');
  return recipe;
};

// 레시피 생성
export const createRecipe = async (dishId, userId, data) => {
  const { stepNumber, instruction, imageUrl, duration } = data;

  const recipe = await prisma.recipe.create({
    data: {
      stepNumber,
      instruction,
      imageUrl,
      duration,
      dishId,
      userId,
    },
    select: recipeSelect,
  });
  return recipe;
};

// 레시피 수정
export const updateRecipe = async (id, userId, data) => {
  const { stepNumber, instruction, imageUrl, duration } = data;
  // 레시피가 존재하는지 확인
  const recipeData = await getOneByIdOrFail(prisma.recipe, id, '레시피');
  if (recipeData.userId !== userId) {
    throw new Error('레시피를 수정할 권한이 없습니다.');
  }

  const updateData = {
    ...(stepNumber && { stepNumber }),
    ...(instruction && { instruction }),
    ...(imageUrl && { imageUrl }),
    ...(duration && { duration }),
  };

  const recipe = await prisma.recipe.update({
    where: { id },
    data: updateData,
    select: recipeSelect,
  });
  return recipe;
};

// 레시피 삭제
export const deleteRecipe = async (id, userId) => {
  // 레시피가 존재하는지 확인
  const recipeData = await getOneByIdOrFail(prisma.recipe, id, '레시피');
  if (recipeData.userId !== userId) {
    throw new Error('레시피를 삭제할 권한이 없습니다.');
  }

  await prisma.recipe.delete({
    where: { id },
  });
};
