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

  async searchUsers(
    limit: number,
    page: number,
    firstName?: string,
    lastName?: string,
    age?: number,
  ) {
    return await this.userRepository.getUsers(
      limit,
      page,
      firstName,
      lastName,
      age,
    );
  }
}
