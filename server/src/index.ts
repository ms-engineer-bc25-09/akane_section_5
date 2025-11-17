import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import expensesRoutes from "./routes/expenses";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// /api/expenses のルート
app.use("/api/expenses", expensesRoutes);

// 🟢 GET: 全件取得
app.get("/api/expenses-list", async (req, res) => {
  const expenses = await prisma.expense.findMany({
    orderBy: { spentAt: "desc" },
  });
  res.json(expenses);
});

// 🟢 POST: 新規登録
app.post("/api/expenses", async (req, res) => {
  const { title, amount, category, spentAt } = req.body;
  const newExpense = await prisma.expense.create({
    data: { title, amount, category, spentAt: new Date(spentAt) },
  });
  res.status(201).json(newExpense);
});

// 🟢 PUT: 更新
app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, spentAt } = req.body;
  const updatedExpense = await prisma.expense.update({
    where: { id: Number(id) },
    data: { title, amount, category, spentAt: new Date(spentAt) },
  });
  res.json(updatedExpense);
});

// 🟢 DELETE: 削除
app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.expense.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted successfully" });
});

// ★ supertest が必要とする export
export { app };

// ★ 開発環境でのみサーバー起動
if (process.env.NODE_ENV !== "test") {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
