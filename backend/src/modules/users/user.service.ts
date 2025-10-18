import { UserRepository } from './user.repository.js';
import type { Prisma } from '@prisma/client';
import type { GetUsersQuery, UpdateUserData, DeleteUserData } from './user.dto.js';
import { verifyPassword, hashPassword } from '../../common/index.js';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  // 모든 사용자 조회
  public getUsers = async (query: GetUsersQuery) => {
    const { limit: take = 10, offset: skip = 0, search } = query;

    // 페이지 네이션 offset 방식
    const searchFilter: Prisma.UserWhereInput = search
      ? {
          OR: [{ nickname: { contains: search, mode: 'insensitive' } }],
        }
      : {};

    // where 조건
    const where: Prisma.UserWhereInput = {
      ...searchFilter,
    };

    // query 구성
    const getQuery: Prisma.UserFindManyArgs = {
      where,
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    };

    const users = await this.userRepository.getUsers(getQuery);

    return users;
  };

  // 특정 사용자 조회
  public getUserById = async (id: string) => {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new Error('사용자를 찾을 수 없습니다.');

    return user;
  };

  // 사용자 수정
  public updateUser = async (id: string, data: UpdateUserData) => {
    const { name, nickname, password, newPassword } = data;
    // 사용자 확인
    const userData = await this.userRepository.findUser(id);
    if (!userData) throw new Error('사용자를 찾을 수 없습니다.');
    if (userData.id !== id) throw new Error('사용자를 수정할 권한이 없습니다.');

    // 비밀번호 확인
    await verifyPassword(password, userData.password);

    const updateData: Prisma.UserUpdateInput = {
      ...(name !== userData.name && { name }),
      ...(nickname !== userData.nickname && { nickname }),
      // 비밀번호 해시 처리
      ...(newPassword && { password: await hashPassword(newPassword) }),
    };

    const user = await this.userRepository.updateUser(id, updateData);

    return user;
  };

  // 사용자 삭제
  public deleteUser = async (id: string, data: DeleteUserData) => {
    const { password } = data;
    // 사용자가 존재하는지 확인
    const userData = await this.userRepository.findUser(id);
    if (!userData) throw new Error('사용자를 찾을 수 없습니다.');
    if (userData.id !== id) throw new Error('사용자를 삭제할 권한이 없습니다.');

    // 비밀번호 확인
    await verifyPassword(password, userData.password);

    return await this.userRepository.deleteUser(id);
  };
}
