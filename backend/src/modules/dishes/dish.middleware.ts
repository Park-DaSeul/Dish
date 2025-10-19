import { validateParams, validateQuery, validateBody } from '../../middlewares/validate.middleware.js';
import { createDish, updateDish } from './dish.dto.js';
import { idSchema, cursorSchema } from '../../common/index.js';

// ----------------
// |  VALIDATORS  |
// ----------------

// id
export const validateId = validateParams(idSchema);

// query
export const validateGetQuery = validateQuery(cursorSchema);

// 요리 게시글 생성
export const validateCreateBody = validateBody(createDish);

// 요리 게시글 수정
export const validateUpdateBody = validateBody(updateDish);
