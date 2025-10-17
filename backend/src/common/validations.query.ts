import { z } from 'zod';
import { validateQuery } from '../middlewares/validate.middleware.js';

// 커서 방식
const cursorSchema = z
  .object({
    limit: z.coerce.number().min(1).max(100).default(10),
    cursor: z.uuid(),
    search: z.string(),
  })
  .partial()
  .strict();

export const validateGetQuery = validateQuery(cursorSchema);

// offset 방식
const offsetSchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).default(10),
    offset: z.coerce.number().min(0).default(0),
    search: z.string(),
  })
  .partial()
  .strict();

export const validateGetOffsetQuery = validateQuery(offsetSchema);
