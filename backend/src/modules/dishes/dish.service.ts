import { DishRepository } from './dish.repository.js';
import type { Prisma } from '@prisma/client';
import type { CreateDishBody, UpdateDishBody } from './dish.dto.js';
import type { CursorQuery } from '../../common/index.js';
import type { Dish } from '@prisma/client';

export class DishService {
  constructor(private dishRepository: DishRepository) {}

  // 모든 요리 게시글 조회
  public getDishes = async (query: CursorQuery) => {
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

    return dish;
  };

  // 요리 게시글 생성
  public createDish = async (userId: string, data: CreateDishBody) => {
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
  public updateDish = async (id: string, data: UpdateDishBody, resource: Dish) => {
    const { title, description, dishIngredient, recipes } = data;

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
      ...(title !== resource.title && { title }),
      ...(description !== resource.description && { description }),
      ...(dishIngredient !== resource.dishIngredient && { dishIngredient }),
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
  public deleteDish = async (id: string) => {
    return await this.dishRepository.deleteDish(id);
  };
}
