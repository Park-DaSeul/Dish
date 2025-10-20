import { validateParams, validateQuery, validateBody } from '../../middlewares/validate.middleware.js';
import { createComment, updateComment } from './comment.dto.js';
import { idSchema, dishIdSchema, cursorSchema } from '../../common/index.js';
import { checkOwnership, checkResourceExists } from '../../middlewares/ownership.middleware.js';
import prisma from '../../libs/prisma.js';

// ----------------
// |  VALIDATORS  |
// ----------------

// id
export const validateId = validateParams(idSchema);
export const validateDishId = validateParams(dishIdSchema);

// query
export const validateGetQuery = validateQuery(cursorSchema);

// 댓글 생성
export const validateCreateBody = validateBody(createComment);

// 댓글 수정
export const validateUpdateBody = validateBody(updateComment);

// -------------------
// |  Authorization  |
// -------------------

// 댓글 생성
export const checkDishExists = checkResourceExists(prisma.dish, 'dishId');

// 댓글 수정
export const ensureCommentOwner = checkOwnership(prisma.comment);
