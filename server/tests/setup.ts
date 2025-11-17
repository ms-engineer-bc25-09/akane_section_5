import { beforeAll, afterAll } from "vitest"; // ⑤ vitest から beforeAll と afterAll をインポート
import { PrismaClient } from "@prisma/client"; // ① PrismaClient をインポート
import { execSync } from "child_process"; // ② child_process モジュールをインポート
import { app } from "../src/index"; // ③ app をインポート
import request from "supertest"; // ④ supertest をインポート

// PrismaClient インスタンスをエクスポート
export const prisma = new PrismaClient();

// ⑤ beforeAll と afterAll を使って、テスト前後のセットアップとクリーンアップを実行
beforeAll(async () => {
  // DBリセット
  execSync("npx prisma migrate reset --force", { stdio: "inherit" });

  // seed投入
  execSync("npx prisma db seed", { stdio: "inherit" });
});

// DB接続を切断
afterAll(async () => {
  await prisma.$disconnect();
});