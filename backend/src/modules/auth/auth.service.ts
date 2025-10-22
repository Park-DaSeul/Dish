import { AuthRepository } from './auth.repository.js';
import type { Prisma } from '@prisma/client';
import type { SignupBody } from './auth.dto.js';
import { hashPassword } from '../../common/index.js';
import { generateTokens } from '../../libs/token.js';
import type { Tokens } from '../../libs/token.js';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  // 회원가입
  public signup = async (data: SignupBody) => {
    const { name, nickname, email, password } = data;

    // 이메일 중복 확인
    const existingUser = await this.authRepository.checkUserExistsByEmail(email);
    if (existingUser) throw new Error('이미 사용 중인 이메일입니다.');

    // 비밀번호 해시 처리
    const hashedPassword = await hashPassword(password);

    const createData: Prisma.UserCreateInput = {
      name,
      nickname,
      email,
      password: hashedPassword,
    };

    const user = await this.authRepository.signup(createData);

    return user;
  };

  // 로그인
  public login = (userId: string): Tokens => {
    return generateTokens(userId);
  };

  // 토큰 재발금
  public refresh = (userId: string): Tokens => {
    return generateTokens(userId);
  };
}
