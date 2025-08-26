import { z } from 'zod';

// 공통 id, title, description, imageUrl (중복 제거)
const idSchema = z.uuid('UUID 형식이어야 합니다.');
const userIdSchema = z.uuid('유효한 사용자 ID를 입력하세요.');
const titleSchema = z
  .string()
  .min(1, '제목은 최소 1글자 이상이어야 합니다.')
  .max(100, '제목은 최대 100글자까지 가능합니다.');
const descriptionSchema = z
  .string()
  .min(1, '내용은 최소 1글자 이상이어야 합니다.')
  .max(1000, '내용은 최대 1000글자까지 가능합니다.');
const imageUrlSchema = z.url('이미지 URL 형식이 올바르지 않습니다.').optional();

// 모든 게시글 조회 (query)
export const getDishes = {
  query: z
    .object({
      page: z.coerce.number().min(1).max(1000).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    })
    .strict(),
};

// 특정 게시글 조회 (params)
export const getDishById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 게시글 생성 (body)
export const createDish = {
  body: z
    .object({
      title: titleSchema,
      description: descriptionSchema,
      imageUrl: imageUrlSchema,
    })
    .strict(),
};

// 게시글 수정 (body + params)
export const updateDish = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      title: titleSchema.optional(),
      description: descriptionSchema.optional(),
      imageUrl: imageUrlSchema.optional(),
    })
    .strict(),
};

// 게시글 삭제 (params)
export const deleteDish = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};
