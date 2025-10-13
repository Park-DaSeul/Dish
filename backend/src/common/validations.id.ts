import { z } from 'zod';
import { validateParams } from '../middlewares/validate.middleware.js';

// id
const idSchema = z
  .object({
    id: z.uuid('유효한 ID를 입력하세요.'),
  })
  .strict();

export const validateId = validateParams(idSchema);

// dishId
const dishIdSchema = z
  .object({
    dishId: z.uuid('유효한 ID를 입력하세요.'),
  })
  .strict();

export const validateDishId = validateParams(dishIdSchema);
