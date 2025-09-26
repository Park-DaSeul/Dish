import express from 'express';
import * as commentController from './comments.controller.js';
import * as commentDto from './comments.dto.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const commentRouter = express.Router({ mergeParams: true });

// --- 여기부터 로그인 필요 ---
commentRouter.use(authenticate);

// 댓글 생성, 특정 요리의 모든 댓글 조회
commentRouter
  .route('/')
  .post(validate(commentDto.createComment), asyncHandler(commentController.createComment))
  .get(validate(commentDto.getComments), asyncHandler(commentController.getComments));

// 특정 댓글 조회, 수정, 삭제 (/:id)
commentRouter
  .route('/:id')
  .get(validate(commentDto.getCommentById), asyncHandler(commentController.getCommentById))
  .put(validate(commentDto.updateComment), asyncHandler(commentController.updateComment))
  .delete(validate(commentDto.deleteComment), asyncHandler(commentController.deleteComment));

export { commentRouter };
