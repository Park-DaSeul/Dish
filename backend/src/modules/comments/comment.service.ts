import { CommentRepository } from './comment.repository.js';
import type { Prisma } from '@prisma/client';
import type { GetCommentsQuery, CreateCommentData, UpdateCommentData } from './comment.dto.js';

export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  // 모든 댓글 조회 (특정요리)
  public getComments = async (query: GetCommentsQuery, dishId: string) => {
    const { limit: take = 10, cursor, search } = query;

    // 페이지 네이션 커서방식
    const searchFilter: Prisma.CommentWhereInput = search
      ? {
          OR: [{ content: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    // where 조건 추가
    const where: Prisma.CommentWhereInput = {
      dishId,
      ...searchFilter,
    };

    // query 구성
    const getQuery: Prisma.CommentFindManyArgs = {
      where,
      take,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { createdAt: 'desc' },
    };

    const comments = await this.commentRepository.getComments(getQuery);

    const lastCommentInResults = comments[comments.length - 1];
    const nextCursor = lastCommentInResults ? lastCommentInResults.id : null;

    const commentsData = {
      comments,
      nextCursor,
    };

    return commentsData;
  };

  // 특정 댓글 조회
  public getCommentById = async (id: string) => {
    const comment = await this.commentRepository.getCommentById(id);
    if (!comment) throw new Error('댓글을 찾을 수 없습니다.');

    return comment;
  };

  // 댓글 생성
  public createComment = async (dishId: string, userId: string, data: CreateCommentData) => {
    const { content } = data;

    // 요리 게시글 존재 확인
    const dishData = await this.commentRepository.findDish(dishId);
    if (!dishData) throw new Error('요리 게시글을 찾을 수 없습니다.');

    const createData: Prisma.CommentCreateInput = {
      content,
      dish: {
        connect: { id: dishId },
      },
      user: {
        connect: { id: userId },
      },
    };

    const comment = await this.commentRepository.createComment(createData);

    return comment;
  };

  // 댓글 수정
  public updateComment = async (id: string, userId: string, data: UpdateCommentData) => {
    const { content } = data;

    // 댓글 존재 확인
    const commentData = await this.commentRepository.findComment(id);
    if (!commentData) throw new Error('댓글을 찾을 수 없습니다.');
    if (commentData.userId !== userId) throw new Error('댓글을 수정할 권한이 없습니다.');

    // 기존 데이터와 새 데이터 비교
    const updateData: Prisma.CommentUpdateInput = {
      ...(content !== commentData.content && { content }),
    };

    if (Object.keys(updateData).length === 0) {
      throw new Error('수정할 내용이 없습니다.');
    }

    const comment = await this.commentRepository.updateComment(id, updateData);

    return comment;
  };

  // 댓글 삭제
  public deleteComment = async (id: string, userId: string) => {
    // 댓글 존재 확인
    const commentData = await this.commentRepository.findComment(id);
    if (!commentData) throw new Error('댓글을 찾을 수 없습니다.');
    if (commentData.userId !== userId) throw new Error('댓글을 삭제할 권한이 없습니다.');

    return await this.commentRepository.deleteComment(id);
  };
}
