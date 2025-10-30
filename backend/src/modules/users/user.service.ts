import { UserRepository } from './user.repository.js';
import type { Prisma } from '@prisma/client';
import type { UpdateUserBody, DeleteUserBody } from './user.dto.js';
import type { OffsetQuery } from '../../common/index.js';
import type { User } from '@prisma/client';
import { verifyPassword, hashPassword } from '../../common/index.js';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  // 모든 사용자 조회
  public getUsers = async (query: OffsetQuery) => {
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

    return user;
  };

  // 사용자 수정
  public updateUser = async (id: string, data: UpdateUserBody, resource: User) => {
    const { name, nickname, password, newPassword } = data;

    // 비밀번호 확인
    if (password) {
      await verifyPassword(password, resource.password);
    }

    // 기존 데이터와 새 데이터 비교
    const updateData: Prisma.UserUpdateInput = {
      ...(name !== resource.name && { name }),
      ...(nickname !== resource.nickname && { nickname }),
      // 비밀번호 해시 처리
      ...(newPassword && { password: await hashPassword(newPassword) }),
    };

    if (Object.keys(updateData).length === 0) {
      throw new Error('수정할 내용이 없습니다.');
    }

    const user = await this.userRepository.updateUser(id, updateData);

    return user;
  };

  // 사용자 삭제
  public deleteUser = async (id: string, data: DeleteUserBody, resource: User) => {
    const { password } = data;

    // 비밀번호 확인
    await verifyPassword(password, resource.password);

    return await this.userRepository.deleteUser(id);
  };
}
