import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /expenses → 全取得
// Express では「使わないエラー引数は _err」にするのが一般的
router.get('/', async (req, res) => { 
  try {
    const expenses = await prisma.expense.findMany({ 
      orderBy: { spentAt: 'desc' },
    });
    res.json(expenses);
  } catch (_err) {
    res.status(500).json({ error: '取得に失敗しました' });
  }
});

// POST /expenses → 新規登録
router.post('/', async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: req.body,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: '登録に失敗しました' });
  }
});

// PUT /expenses/:id → 更新
router.put('/:id', async (req, res) => {
  try {
    const expense = await prisma.expense.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: '更新に失敗しました' });
  }
});

// DELETE /expenses/:id → 削除
router.delete('/:id', async (req, res) => {
  try {
    await prisma.expense.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: '削除しました' });
  } catch (err) {
    res.status(500).json({ error: '削除に失敗しました' });
  }
});

export default router;
