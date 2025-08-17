import * as userService from '../services/user.service.js';

// 모든 유저 조회
export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

// 특정 유저 조회
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.json(user);
};

// 유저 생성 (회원가입)
export const createUser = async (req, res) => {
  const data = req.body;
  const user = await userService.createUser(data);
  res.status(201).json(user);
};

// 유저 수정
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await userService.updateUser(id, data);
  res.json(user);
};

// 유저 삭제
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await userService.deleteUser(id, data);
  res.status(204).json({ message: '사용자가 삭제되었습니다.', id });
};

// 로그인
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await userService.loginUser(email, password);
  res.json({ user, token });
};
