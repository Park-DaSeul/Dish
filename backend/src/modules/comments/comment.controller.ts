import { CommentService } from './comment.service.js';
import type { Response } from 'express';
import type {
  GetCommentsRequest,
  GetCommentByIdRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  DeleteCommentRequest,
} from './comment.dto.js';

export class CommentController {
  constructor(private commentService: CommentService) {}

  // 모든 댓글 조회 (특정요리)
  public getComments = async (req: GetCommentsRequest, res: Response) => {
    const query = req.parsedQuery;

    const { dishId } = req.parsedParams;
    if (!dishId) throw new Error('요리 게시글 ID가 필요합니다.');

    const commentsData = await this.commentService.getComments(query, dishId);
    return res.json({ success: true, data: commentsData });
  };

  // 특정 댓글 조회
  public getCommentById = async (req: GetCommentByIdRequest, res: Response) => {
    const { id } = req.parsedParams;
    if (!id) throw new Error('댓글 ID가 필요합니다.');

    const comment = await this.commentService.getCommentById(id);
    return res.json({ success: true, data: comment });
  };

  // 댓글 생성
  public createComment = async (req: CreateCommentRequest, res: Response) => {
    const { dishId } = req.parsedParams;
    if (!dishId) throw new Error('요리 게시글 ID가 필요합니다.');

    if (!req.user) throw new Error('사용자 인증이 필요합니다.');
    const userId = req.user.id;

    const data = req.parsedBody;
    const comment = await this.commentService.createComment(dishId, userId, data);
    return res.status(201).json({ success: true, data: comment });
  };

  // 댓글 수정
  public updateComment = async (req: UpdateCommentRequest, res: Response) => {
    const { id } = req.parsedParams;
    if (!id) throw new Error('댓글 ID가 필요합니다.');

    if (!req.user) throw new Error('사용자 인증이 필요합니다.');
    const userId = req.user.id;

    const data = req.parsedBody;
    const comment = await this.commentService.updateComment(id, userId, data);
    return res.json({ success: true, data: comment });
  };

  // 댓글 삭제
  public deleteComment = async (req: DeleteCommentRequest, res: Response) => {
    const { id } = req.parsedParams;
    if (!id) throw new Error('댓글 ID가 필요합니다.');

    if (!req.user) throw new Error('사용자 인증이 필요합니다.');
    const userId = req.user.id;

    await this.commentService.deleteComment(id, userId);
    return res.status(200).json({ success: true, message: '댓글이 삭제되었습니다.' });
  };
}
