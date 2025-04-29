// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './users/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const existing = await userService.findByUsername('admin');
  if (!existing) {
    await userService.create('admin', 'admin123');
    console.log('Seeded user: admin / admin123');
  } else {
    console.log('User already exists');
  }

  await app.close();
}
bootstrap();
