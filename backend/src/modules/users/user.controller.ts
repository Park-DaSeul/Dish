import { UserService } from './user.service.js';
import type { Response } from 'express';
import type { GetUsersRequest, GetUserByIdRequest, UpdateUserRequest, DeleteUserRequest } from './user.dto.js';

export class UserController {
  constructor(private userService: UserService) {}

  // 모든 사용자 조회
  public getUsers = async (req: GetUsersRequest, res: Response) => {
    const query = req.parsedQuery;

    const users = await this.userService.getUsers(query);
    res.status(200).json({ success: true, data: users });
  };

  // 특정 사용자 조회
  public getUserById = async (req: GetUserByIdRequest, res: Response) => {
    const { id } = req.user;

    const user = await this.userService.getUserById(id);
    res.status(200).json({ success: true, data: user });
  };

  // 사용자 수정
  public updateUser = async (req: UpdateUserRequest, res: Response) => {
    const { id } = req.user;

    const resource = req.user;

    const data = req.parsedBody;
    const user = await this.userService.updateUser(id, data, resource);
    res.status(200).json({ success: true, data: user });
  };

  // 사용자 삭제
  public deleteUser = async (req: DeleteUserRequest, res: Response) => {
    const { id } = req.user;

    const resource = req.user;

    const data = req.parsedBody;
    await this.userService.deleteUser(id, data, resource);
    res.status(200).json({ success: true, message: '사용자가 삭제되었습니다.' });
  };
}
