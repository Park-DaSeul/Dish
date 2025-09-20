import * as userService from './users.service.js';

// 모든 사용자 조회
export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json({ success: true, data: users });
};

// 특정 사용자 조회
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.json({ success: true, data: user });
};

// 사용자 수정
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await userService.updateUser(id, data);
  res.json({ success: true, data: user });
};

// 사용자 삭제
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await userService.deleteUser(id, data);
  res.status(200).json({ success: true, message: '사용자가 삭제되었습니다.' });
};
