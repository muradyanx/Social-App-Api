import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/users/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserData(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async searchUsers({
    firstName,
    lastName,
    age,
    limit,
    page,
  }: {
    firstName?: string;
    lastName?: string;
    age?: number;
    limit: number;
    page: number;
  }) {
    return await this.userRepository.getUsers({
      firstName,
      lastName,
      age,
      limit,
      page,
    });
  }
}
