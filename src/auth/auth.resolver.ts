import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
