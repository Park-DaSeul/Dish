// authzMiddleware.ts에서 제네릭 팩토리 함수들을 임포트합니다.
import { checkOwnership, checkResourceExists } from './ownership.middleware.js';
// 실제 Prisma 클라이언트 인스턴스 (서비스의 진입점 어딘가에서 임포트된다고 가정)
import prisma from '../libs/prisma.js'; // 가상의 prisma 경로

// ----------------------------------------------------------------------
// 🎯 1. 타입 정의 (Prisma 모델을 위한 타입)
// ----------------------------------------------------------------------

// 예시: Dish 모델의 타입 (Prisma 스키마와 일치해야 함)
interface DishModel {
  id: string;
  userId: string; // 소유권 확인을 위한 필드
  title: string;
}

// ----------------------------------------------------------------------
// 🎯 2. 리소스 존재 여부 확인 정책 (Check Existence Policies)
// ----------------------------------------------------------------------

/**
 * URL 파라미터 'dishId'를 사용하여 Dish가 존재하는지 확인합니다.
 * @example router.get('/:dishId', checkDishExists, dishController.getOne)
 */
export const checkDishExists = checkResourceExists(prisma.dish, 'dishId');

/**
 * URL 파라미터 'commentId'를 사용하여 Comment가 존재하는지 확인합니다.
 */
export const checkCommentExists = checkResourceExists(prisma.comment, 'commentId');

// ----------------------------------------------------------------------
// 🎯 3. 소유권 확인 정책 (Ownership Policies)
// ----------------------------------------------------------------------

/**
 * URL 파라미터 'dishId'를 사용하여 요청 사용자에게 해당 Dish의 소유권이 있는지 확인합니다.
 * 리소스 데이터를 req.resource에 pre-load 합니다.
 * @example router.patch('/:dishId', ensureDishOwner, dishController.update)
 */
export const ensureDishOwner = checkOwnership(prisma.dish);

/**
 * URL 파라미터 'commentId'를 사용하여 요청 사용자에게 해당 Comment의 소유권이 있는지 확인합니다.
 */
export const ensureCommentOwner = checkOwnership(prisma.comment);
