import { z } from 'zod';

// 커서 방식
export const cursorSchema = z
  .object({
    limit: z.coerce.number().min(1).max(100).default(10),
    cursor: z.uuid(),
    search: z.string(),
  })
  .partial()
  .strict();

// offset 방식
export const offsetSchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).default(10),
    offset: z.coerce.number().min(0).default(0),
    search: z.string(),
  })
  .partial()
  .strict();
