import type { Prisma, PrismaClient } from '@prisma/client';

export class CommentRepository {
  constructor(private prisma: PrismaClient) {}

  // 모든 댓글 조회 (특정요리)
  public getComments = async (getQuery: Prisma.CommentFindManyArgs) => {
    const comments = await this.prisma.comment.findMany({
      ...getQuery,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return comments;
  };

  // 특정 댓글 조회
  public getCommentById = async (id: string) => {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return comment;
  };

  // 댓글 생성
  public createComment = async (createData: Prisma.CommentCreateInput) => {
    const comment = await this.prisma.comment.create({
      data: createData,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return comment;
  };

  // 댓글 수정
  public updateComment = async (id: string, updateData: Prisma.CommentUpdateInput) => {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return comment;
  };

  // 댓글 삭제
  public deleteComment = async (id: string) => {
    return await this.prisma.comment.delete({
      where: { id },
    });
  };
}
