import express from 'express';
import * as commentController from './comments.controller.js';
import { validateCreateBody, validateUpdateBody } from './comments.dto.js';
import { validateId, validateDishId, validateGetQuery } from '../../common/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import passport from '../../libs/passport/index.js';

const commentRouter = express.Router({ mergeParams: true });

// --- 여기부터 로그인 필요 ---
commentRouter.use(passport.authenticate('access-token', { session: false }));

// 모든 댓글 조회 (특정요리)
commentRouter.route('/').get(validateDishId, validateGetQuery, asyncHandler(commentController.getComments));

// 댓글 생성
commentRouter.route('/').post(validateDishId, validateCreateBody, asyncHandler(commentController.createComment));

// 특정 댓글 조회, 수정, 삭제 (/:id)
commentRouter
  .route('/:id')
  .get(validateId, asyncHandler(commentController.getCommentById))
  .put(validateId, validateUpdateBody, asyncHandler(commentController.updateComment))
  .delete(validateId, asyncHandler(commentController.deleteComment));

export { commentRouter };
