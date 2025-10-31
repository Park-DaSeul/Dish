import express from 'express';
import prisma from '../../libs/prisma.js';
import { DishRepository } from './dish.repository.js';
import { DishService } from './dish.service.js';
import { DishController } from './dish.controller.js';
import {
  validateId,
  validateGetQuery,
  validateCreateBody,
  validateUpdateBody,
  checkDishOwner,
} from './dish.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { commentRouter } from '../comments/comment.router.js';

const dishRouter = express.Router();

// 의존성 주입
const dishRepository = new DishRepository(prisma);
const dishService = new DishService(dishRepository);
const dishController = new DishController(dishService);

// 모든 요리 게시글 조회 (인증 불필요)
dishRouter.get('/', validateGetQuery, asyncHandler(dishController.getDishes));

// 특정 요리 게시글 조회 (인증 불필요)
dishRouter.get('/:id', validateId, asyncHandler(dishController.getDishById));

// --- 여기부터 로그인 필요 ---
dishRouter.use(authenticate);

// 요리 게시글 생성
dishRouter.post('/', validateCreateBody, asyncHandler(dishController.createDish));

// 특정 요리 게시글 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .put(validateId, validateUpdateBody, checkDishOwner, asyncHandler(dishController.updateDish))
  .delete(validateId, checkDishOwner, asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', commentRouter);

export { dishRouter };
