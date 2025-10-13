import { z } from 'zod';

// id
export const uuidSchema = z.uuid('유효한 ID를 입력하세요.');
export const userIdSchema = z.uuid('유효한 사용자 ID를 입력하세요.');
export const dishIdSchema = z.uuid('유효한 게시물 ID를 입력하세요.');

// 페이지 네이션
export const offsetSchema = z.coerce.number().min(1).max(100).default(0);
export const limitSchema = z.coerce.number().min(1).max(100).default(10);
export const orderSchema = z.string();
export const searchSchema = z.string();
export const cursorSchema = z.uuid();
export const pageSchema = z.coerce.number().min(1).max(1000).default(1);

// 공용
export const imageUrlSchema = z.url('이미지 URL 형식이 올바르지 않습니다.').optional();
export const nameSchema = z
  .string()
  .min(1, '이름은 최소 1글자 이상이어야 합니다.')
  .max(100, '이름은 최대 100글자까지 가능합니다.');

// auth + user
export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
  .max(20, '닉네임은 최대 20글자까지 가능합니다.');
export const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  .max(20, '비밀번호는 최대 20자리까지 가능합니다.');
export const emailSchema = z.email('올바른 이메일 형식이 아닙니다.');

// comment
export const contentShema = z
  .string()
  .min(1, '댓글은 최소 1글자 이상이어야 합니다.')
  .max(500, '댓글은 최대 500글자까지 가능합니다.');

// dish
export const titleSchema = z
  .string()
  .min(1, '제목은 최소 1글자 이상이어야 합니다.')
  .max(100, '제목은 최대 100글자까지 가능합니다.');
export const descriptionSchema = z
  .string()
  .min(1, '내용은 최소 1글자 이상이어야 합니다.')
  .max(1000, '내용은 최대 1000글자까지 가능합니다.');

// recipe
export const stepNumberSchema = z.coerce
  .number()
  .int()
  .min(1, '단계 번호는 1 이상이어야 합니다.')
  .max(10, '단계 번호는 10 이하이어야 합니다.');
export const instructionSchema = z
  .string()
  .min(1, '설명은 최소 1글자 이상이어야 합니다.')
  .max(1000, '설명은 최대 1000글자까지 가능합니다.');
export const durationSchema = z.coerce
  .number()
  .int()
  .min(1, '시간은 1초 이상이어야 합니다.')
  .max(3600, '시간은 3600초 이하이어야 합니다.');
export const recipesSchema = z
  .array(
    z.object({
      stepNumber: stepNumberSchema,
      instruction: instructionSchema,
      imageUrl: imageUrlSchema,
    }),
  )
  .min(1, '레시피는 최소 1개 이상이어야 합니다.')
  .max(10, '레시피는 최대 10개까지 가능합니다.');

// ingredient
export const ingredientsSchema = z
  .array(z.string())
  .min(1, '재료는 최소 1개 이상이어야 합니다.')
  .max(30, '재료는 최대 30개까지 가능합니다.')
  .transform((data) => {
    return data.map((item) => {
      // 정규 표현식을 사용하여 문자열을 name, quantity, unit으로 분리합니다.
      // 예: "돼지고기 600g" -> name: "돼지고기", quantity: "600", unit: "g"
      const regex = /^(.*?)\s*(\d+(?:\.\d+)?)\s*([a-zA-Z가-힣]+)?$/;
      const match = item.trim().match(regex);

      if (match) {
        return {
          name: match[1].trim(),
          quantity: match[2],
          unit: match[3] || null, // 단위가 없는 경우 null
        };
      } else {
        // 정규식에 일치하지 않는 경우 전체를 이름으로 처리
        return {
          name: item.trim(),
          quantity: null,
          unit: null,
        };
      }
    });
  });
