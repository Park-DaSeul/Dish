import express from 'express';
import * as commentController from '../controllers/comment.controller.js';
import * as commentValidation from '../validations/comment.validation.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const dishNestedCommentRouter = express.Router({ mergeParams: true });
const commentRouter = express.Router();

// 로그인 필요
// 아래 라우터는 모두 인증 필요
commentRouter.use(authenticate);

// 댓글 생성, 특정 요리의 모든 댓글 조회
dishNestedCommentRouter
  .route('/')
  .post(validate(commentValidation.createComment), asyncHandler(commentController.createComment))
  .get(validate(commentValidation.getComments), asyncHandler(commentController.getComments));

// 특정 댓글 조회, 수정, 삭제 (/:id)
commentRouter
  .route('/:id')
  .get(validate(commentValidation.getCommentById), asyncHandler(commentController.getCommentById))
  .put(validate(commentValidation.updateComment), asyncHandler(commentController.updateComment))
  .delete(validate(commentValidation.deleteComment), asyncHandler(commentController.deleteComment));

export { commentRouter, dishNestedCommentRouter };
