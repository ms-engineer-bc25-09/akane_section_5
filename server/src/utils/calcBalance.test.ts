// src/utils/calcBalance.test.ts

import { describe, it, expect } from 'vitest';
import { calcBalance } from './calcBalance';

describe('calcBalance', () => {
  // ===== 正常系 =====
  describe('正常系', () => {
    it('収入と支出の差を正しく計算できる', () => {
      expect(calcBalance(10000, 3000)).toBe(7000);
    });

    it('収入や支出が0でも計算できる', () => {
      expect(calcBalance(0, 0)).toBe(0);
      expect(calcBalance(1000, 0)).toBe(1000);
      expect(calcBalance(1000, 1000)).toBe(0);
    });
  });

  // ===== 異常系 =====
  describe('異常系（エラーが出る場合）', () => {
    it('収入が未入力（null）の場合はエラー', () => {
      // @ts-expect-error テストのため
      expect(() => calcBalance(null, 1000)).toThrow('収入が未入力です');
    });

    it('支出が未入力（undefined）の場合はエラー', () => {
      // @ts-expect-error テストのため
      expect(() => calcBalance(1000, undefined)).toThrow('支出が未入力です');
    });

    it('収入が数値でない（NaN）の場合はエラー', () => {
      expect(() => calcBalance(NaN, 1000)).toThrow(
        '収入には数値を入力してください'
      );
    });

    it('支出が数値でない（NaN）の場合はエラー', () => {
      expect(() => calcBalance(1000, NaN)).toThrow(
        '支出には数値を入力してください'
      );
    });

    it('収入が無限大の場合はエラー', () => {
      expect(() => calcBalance(Infinity, 1000)).toThrow(
        '収入と支出には正しい数値を入力してください'
      );
    });

    it('支出が無限大の場合はエラー', () => {
      expect(() => calcBalance(1000, Infinity)).toThrow(
        '収入と支出には正しい数値を入力してください'
      );
    });

    it('収入がマイナスの場合はエラー', () => {
      expect(() => calcBalance(-1, 1000)).toThrow(
        '収入にマイナスは入力できません'
      );
    });

    it('支出がマイナスの場合はエラー', () => {
      expect(() => calcBalance(1000, -1)).toThrow(
        '支出にマイナスは入力できません'
      );
    });

    it('金額が大きすぎる場合はエラー', () => {
      expect(() => calcBalance(2_000_000_000, 1000)).toThrow(
        '金額が大きすぎます'
      );
    });
  });
});
