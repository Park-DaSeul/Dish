import { z } from 'zod';
import type { ValidatedRequest } from '../../middlewares/validate.middleware.js';

// ----------
// |  TYPE  |
// ----------

// 모든 요리 게시글 조회
export interface GetDishesRequest extends ValidatedRequest {
  parsedQuery: GetDishesQuery;
}

export interface GetDishesQuery {
  limit?: number;
  cursor?: string;
  search?: string;
}

// 특정 요리 게시물 조회
export interface GetDishByIdRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
}

// 요리 게시글 생성
export interface CreateDishRequest extends ValidatedRequest {
  parsedBody: CreateDishData;
}

interface RecipeInput {
  stepNumber: number;
  instruction: string;
}
interface DishImageInput {
  id: string;
}
interface RecipeImageInput {
  id: string;
}

export interface CreateDishData {
  title: string;
  description: string;
  dishIngredient: string;
  dishImages: DishImageInput[];
  recipeImages: RecipeImageInput[];
  recipes: RecipeInput[];
}

export interface CreateDishRepositoryData extends CreateDishData {
  userId: string;
}

// 요리 게시물 수정
export interface UpdateDishRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
  parsedBody: UpdateDishData;
}

interface RecipeUpdateInput {
  id: string;
  instruction: string;
}

export interface UpdateDishData {
  title: string;
  description: string;
  dishIngredient: string;
  recipes: RecipeUpdateInput[];
}

// 요리 게시물 삭제
export interface DeleteDishRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
}

// -----------------
// |  ZOD SCHEMAS  |
// -----------------

// dish
const titleSchema = z
  .string()
  .min(1, '제목은 최소 1글자 이상이어야 합니다.')
  .max(100, '제목은 최대 100글자까지 가능합니다.');
const descriptionSchema = z
  .string()
  .min(1, '내용은 최소 1글자 이상이어야 합니다.')
  .max(1000, '내용은 최대 1000글자까지 가능합니다.');
const dishIngredientSchema = z
  .string()
  .min(1, '요리 재료는 최소 1글자 이상이어야 합니다.')
  .max(1000, '요리 재료는 최대 1000글자까지 가능합니다.');

// image
const dishImagesSchema = z
  .array(
    z
      .object({
        id: z.uuid(),
      })
      .strict(),
  )
  .min(1, '이미지는 최소 1개 이상이어야 합니다.')
  .max(5, '이미지는 최대 5개까지 가능합니다.');
const recipeImagesSchema = z
  .array(
    z
      .object({
        id: z.uuid(),
      })
      .strict(),
  )
  .max(10, '이미지는 최대 10개까지 가능합니다.');

// recipe
const stepNumberSchema = z.coerce
  .number()
  .int()
  .min(1, '단계 번호는 1 이상이어야 합니다.')
  .max(10, '단계 번호는 10 이하이어야 합니다.');
const instructionSchema = z
  .string()
  .min(1, '설명은 최소 1글자 이상이어야 합니다.')
  .max(1000, '설명은 최대 1000글자까지 가능합니다.');
const recipesSchema = z
  .array(
    z.object({
      stepNumber: stepNumberSchema,
      instruction: instructionSchema,
    }),
  )
  .min(1, '레시피는 최소 1개 이상이어야 합니다.')
  .max(10, '레시피는 최대 10개까지 가능합니다.');
const recipesUpdateSchema = z
  .array(
    z.object({
      id: z.uuid('유효한 ID를 입력하세요.'),
      instruction: instructionSchema,
    }),
  )
  .min(1, '레시피는 최소 1개 이상이어야 합니다.')
  .max(10, '레시피는 최대 10개까지 가능합니다.');

// 요리 게시글 생성
export const createDish = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    dishIngredient: dishIngredientSchema,
    dishImages: dishImagesSchema,
    ecipeImages: recipeImagesSchema,
    recipes: recipesSchema,
  })
  .strict();

// 요리 게시글 수정
export const updateDish = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    dishIngredient: dishIngredientSchema,
    recipes: recipesUpdateSchema,
  })
  .strict();
