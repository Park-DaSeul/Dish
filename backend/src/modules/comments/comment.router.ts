import express from 'express';
import prisma from '../../libs/prisma.js';
import { CommentRepository } from './comment.repository.js';
import { CommentService } from './comment.service.js';
import { CommentController } from './comment.controller.js';
import {
  validateId,
  validateDishId,
  validateGetQuery,
  validateCreateBody,
  validateUpdateBody,
  checkDishExists,
  checkCommentOwner,
} from './comment.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const commentRouter = express.Router({ mergeParams: true });

// 의존성 주입
const commentRepository = new CommentRepository(prisma);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

// --- 여기부터 로그인 필요 ---
commentRouter.use(authenticate);

// 모든 댓글 조회 (특정요리), 댓글 생성
commentRouter
  .route('/')
  .get(validateDishId, validateGetQuery, asyncHandler(commentController.getComments))
  .post(validateDishId, validateCreateBody, checkDishExists, asyncHandler(commentController.createComment));

// 특정 댓글 조회, 수정, 삭제 (/:id)
commentRouter
  .route('/:id')
  .get(validateId, asyncHandler(commentController.getCommentById))
  .put(validateId, validateUpdateBody, checkCommentOwner, asyncHandler(commentController.updateComment))
  .delete(validateId, checkCommentOwner, asyncHandler(commentController.deleteComment));

export { commentRouter };
