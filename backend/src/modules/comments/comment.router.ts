import express from 'express';
import prisma from '../../libs/prisma.js';
import { CommentRepository } from './comment.repository.js';
import { CommentService } from './comment.service.js';
import { CommentController } from './comment.controller.js';
import { validateCreateBody, validateUpdateBody } from './comment.dto.js';
import { validateId, validateDishId, validateGetQuery } from '../../common/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const commentRouter = express.Router({ mergeParams: true });

// 의존성 주입
const commentRepository = new CommentRepository(prisma);
const commentService = new CommentService(commentRepository);
const commentsController = new CommentController(commentService);

// --- 여기부터 로그인 필요 ---
commentRouter.use(authenticate);

// 모든 댓글 조회 (특정요리)
commentRouter.route('/').get(validateDishId, validateGetQuery, asyncHandler(commentsController.getComments));

// 댓글 생성
commentRouter.route('/').post(validateDishId, validateCreateBody, asyncHandler(commentsController.createComment));

// 특정 댓글 조회, 수정, 삭제 (/:id)
commentRouter
  .route('/:id')
  .get(validateId, asyncHandler(commentsController.getCommentById))
  .put(validateId, validateUpdateBody, asyncHandler(commentsController.updateComment))
  .delete(validateId, asyncHandler(commentsController.deleteComment));

export { commentRouter };
