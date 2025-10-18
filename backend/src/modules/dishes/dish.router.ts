import express from 'express';
import prisma from '../../libs/prisma.js';
import { DishRepository } from './dish.repository.js';
import { DishService } from './dish.service.js';
import { DishController } from './dish.controller.js';
import { validateCreateBody, validateUpdateBody } from './dish.dto.js';
import { validateId, validateGetQuery } from '../../common/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { commentRouter } from '../comments/comment.router.js';

const dishRouter = express.Router();

// 의존성 주입
const dishRepository = new DishRepository(prisma);
const dishService = new DishService(dishRepository);
const dishController = new DishController(dishService);

// 모든 요리 게시글 조회 (인증 불필요)
dishRouter.route('/').get(validateGetQuery, asyncHandler(dishController.getDishes));

// --- 여기부터 로그인 필요 ---
commentRouter.use(authenticate);

// 요리 게시글 생성
dishRouter.route('/').post(validateCreateBody, asyncHandler(dishController.createDish));

// 특정 요리 게시글 조회, 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .get(validateId, asyncHandler(dishController.getDishById))
  .put(validateId, validateUpdateBody, asyncHandler(dishController.updateDish))
  .delete(validateId, asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', commentRouter);

export { dishRouter };
