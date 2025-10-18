import { DishRepository } from './dish.repository.js';
import type { Prisma } from '@prisma/client';
import type { GetDishesQuery, CreateDishData, UpdateDishData } from './dish.dto.js';

export class DishService {
  constructor(private dishRepository: DishRepository) {}

  // 모든 요리 게시글 조회
  public getDishes = async (query: GetDishesQuery) => {
    const { limit: take = 10, cursor, search } = query;

    // 페이지 네이션 커서방식
    const where: Prisma.DishWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // query 구성
    const getQuery: Prisma.DishFindManyArgs = {
      where,
      take,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { createdAt: 'desc' },
    };

    const dishes = await this.dishRepository.getDishes(getQuery);

    const lastDishInResults = dishes[dishes.length - 1];
    const nextCursor = lastDishInResults ? lastDishInResults.id : null;

    const dishesData = {
      dishes,
      nextCursor,
    };

    return dishesData;
  };

  // 특정 요리 게시글 조회
  public getDishById = async (id: string) => {
    const dish = await this.dishRepository.getDishById(id);
    if (!dish) throw new Error('요리 게시글을 찾을 수 없습니다.');

    return dish;
  };

  // 요리 게시글 생성
  public createDish = async (userId: string, data: CreateDishData) => {
    const { title, description, dishIngredient, dishImages, recipeImages, recipes } = data;

    // recipes 안에 recipesImages 각각 대입
    const recipesData = recipes.map((recipe, index) => {
      const imageToConnect = recipeImages[index];

      if (!imageToConnect) throw new Error('이미지 ID가 필요합니다.');

      // Prisma RecipeCreateInput 형태로 변환
      return {
        stepNumber: recipe.stepNumber,
        instruction: recipe.instruction,
        user: {
          connect: { id: userId },
        },
        images: {
          connect: { id: imageToConnect.id },
        },
      };
    });

    const createData: Prisma.DishCreateInput = {
      title,
      description,
      dishIngredient,
      user: {
        connect: { id: userId },
      },
      recipes: {
        create: recipesData,
      },
      images: {
        connect: dishImages,
      },
    };

    const dish = await this.dishRepository.createDish(createData);

    return dish;
  };

  // 요리 게시글 수정
  public updateDish = async (id: string, userId: string, data: UpdateDishData) => {
    const { title, description, dishIngredient, recipes } = data;

    // 요리 게시글 존재 확인
    const dishData = await this.dishRepository.findDish(id);
    if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');
    if (dishData.userId !== userId) throw new Error('요리 게시글을 수정할 권한이 없습니다.');

    const recipesData = recipes.map((recipe) => {
      return {
        where: {
          id: recipe.id,
          dishId: id,
        },
        data: {
          instruction: recipe.instruction,
        },
      };
    });

    // 기존 데이터와 새 데이터 비교
    const updateData: Prisma.DishUpdateInput = {
      ...(title !== dishData.title && { title }),
      ...(description !== dishData.description && { description }),
      ...(dishIngredient !== dishData.dishIngredient && { dishIngredient }),
      recipes: {
        updateMany: recipesData,
      },
    };

    if (Object.keys(updateData).length === 0) {
      throw new Error('수정할 내용이 없습니다.');
    }

    const updatedDish = await this.dishRepository.updateDish(id, updateData);

    return updatedDish;
  };

  // 요리 게시글 삭제
  public deleteDish = async (id: string, userId: string) => {
    // 요리 게시글 존재 확인
    const dishData = await this.dishRepository.findDish(id);
    if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');
    if (dishData.userId !== userId) throw new Error('요리 게시글을 삭제할 권한이 없습니다.');

    return await this.dishRepository.deleteDish(id);
  };
}
