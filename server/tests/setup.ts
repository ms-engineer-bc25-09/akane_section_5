import { beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

// PrismaClient インスタンスをエクスポート
export const prisma = new PrismaClient();

// テスト前後のDBリセットと接続管理
beforeAll(async () => {
  execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
});

afterAll(async () => {
  await prisma.$disconnect();
});
