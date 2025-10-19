import { z } from 'zod';

// id
export const idSchema = z
  .object({
    id: z.uuid('유효한 ID를 입력하세요.'),
  })
  .strict();

// dishId
export const dishIdSchema = z
  .object({
    dishId: z.uuid('유효한 ID를 입력하세요.'),
  })
  .strict();
