import * as authService from './auth.service.js';

// 회원가입
export const signup = async (req, res) => {
  const data = req.body;

  const user = await authService.signup(data);
  return res.status(201).json({ success: true, data: user });
};

// 로그인
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);
  return res.json({ success: true, user, token });
};
