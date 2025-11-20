import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/index';

// GET /api/expenses-list
describe('GET /api/expenses-list', () => {
  it('支出一覧を取得できる', async () => {
    const res = await request(app).get('/api/expenses-list');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('amount');
    }
  });
});

// POST /api/expenses
describe('POST /api/expenses', () => {
  it('新しい支出を作成できる', async () => {
    const body = {
      title: 'テスト支出',
      amount: 1000,
      category: 'food',
      spentAt: '2024-01-02',
    };

    const res = await request(app).post('/api/expenses').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: 'テスト支出',
      amount: 1000,
      category: 'food',
    });
  });
});

// PUT /api/expenses/:id
describe('PUT /api/expenses/:id', () => {
  it('支出データを更新できる', async () => {
    // まず1件作成
    const created = await request(app).post('/api/expenses').send({
      title: 'before update',
      amount: 500,
      category: 'test',
      spentAt: '2024-01-03',
    });

    const id = created.body.id;

    // 更新リクエスト
    const res = await request(app).put(`/api/expenses/${id}`).send({
      title: 'after update',
      amount: 3000,
      category: 'updated',
      spentAt: '2024-01-04',
    });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('after update');
    expect(res.body.amount).toBe(3000);
  });
});

// DELETE /api/expenses/:id
describe('DELETE /api/expenses/:id', () => {
  it('支出データを削除できる', async () => {
    // まず1件作成
    const created = await request(app).post('/api/expenses').send({
      title: '削除される支出',
      amount: 400,
      category: 'test',
      spentAt: '2024-01-05',
    });

    const id = created.body.id;

    const res = await request(app).delete(`/api/expenses/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted successfully' });
  });
});
