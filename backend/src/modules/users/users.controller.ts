import * as userService from './users.service.js';
import type { GetUsersRequest, GetUserByIdRequest, UpdateUserRequest, DeleteUserRequest } from './users.dto.js';
import type { Response } from 'express';

// 모든 사용자 조회
export const getUsers = async (req: GetUsersRequest, res: Response) => {
  const query = req.parsedQuery;

  const users = await userService.getUsers(query);
  res.json({ success: true, data: users });
};

// 특정 사용자 조회
export const getUserById = async (req: GetUserByIdRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('사용자 ID가 필요합니다.');

  const user = await userService.getUserById(id);
  res.json({ success: true, data: user });
};

// 사용자 수정
export const updateUser = async (req: UpdateUserRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('사용자 ID가 필요합니다.');

  const data = req.parsedBody;
  const user = await userService.updateUser(id, data);
  res.json({ success: true, data: user });
};

// 사용자 삭제
export const deleteUser = async (req: DeleteUserRequest, res: Response) => {
  const { id } = req.parsedParams;
  if (!id) throw new Error('사용자 ID가 필요합니다.');

  const data = req.parsedBody;
  await userService.deleteUser(id, data);
  res.status(200).json({ success: true, message: '사용자가 삭제되었습니다.' });
};
