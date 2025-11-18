**supertest（スーパー・テスト）**は、API テストを書くときにほぼ必ず使われる有名なライブラリです。

初心者向けに、図や例も使って分かりやすく解説します👇

---

# 🚀 supertest とは？

**supertest は、Node.js 上で動いている API（Express など）に対して、
「HTTP リクエストを送るためのテスト用ライブラリ」**です。

API に直接アクセスして、その結果が正しいかどうかをテストできます。

---

### 👉 **「ブラウザや Postman の代わりに、テストコードから HTTP リクエストを送るツール」**

という感じです。

実際に API を叩く → 結果を見る → 正しいか判定する
という流れを、コードの中で自動化してくれます。

---

# 🧪 supertest があると何が嬉しいの？

| supertest あり           | supertest なし                    |
| ---------------------- | ------------------------------- |
| テストコードで API を直接叩ける     | 自分で fetch() や axios を用意しないといけない |
| Express アプリをそのままテストできる | 実際のサーバー起動が必要                    |
| リクエストがとても書きやすい         | HTTP テストが複雑になる                  |

---

# 👀 supertest のイメージ図

supertest を使うと、テストコードから API を叩く流れはこんな感じ👇

```
┌──────────────┐   リクエスト    ┌─────────────────┐
│  テストコード（Vitest） │ ─────────▶ │ Express API サーバー │
└──────────────┘  ◀────────── └─────────────────┘
                         レスポンス
```

supertest は “HTTP クライアント” として動いてくれます。

---

# ✏️ supertest のコード例（とてもシンプル）

例えば、ユーザー登録の API を叩くなら👇

```ts
import request from "supertest";
import { app } from "../src/index";

it("ユーザー登録できること", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "test@example.com",
      password: "password123",
      name: "Taro"
    });

  expect(res.status).toBe(201);
});
```

このコードのポイントは2つだけ！

---

# 🌟 supertest のポイント2つ

## ① `request(app)` が Express アプリに直接アクセスさせてくれる

本当は API を叩くにはサーバーを起動しますが、
supertest は **Express の app をそのまま使ってテスト可能**です。

```
request(app)
```

---

## ② `.post().get().send()` が Postman そっくり

supertest の操作は Postman とほぼ同じ！

| supertest                      | Postman         |
| ------------------------------ | --------------- |
| `post("/api/login")`           | POST /api/login |
| `.send({ data })`              | Body に JSON     |
| `.set("Authorization", token)` | Header に設定      |
| `.expect(200)`                 | ステータスチェック       |

＼ **Postman をコードから自動でやってくれる感じ！** ／

---

# 🤔 supertest はフロント側では使わないの？

### ❌ 使いません

supertest は **バックエンド API のテスト専用**です。
サーバー側（server/）のテストで使います。

client（Next.js）では使いません。

---

# 💡 supertest を使うシーンまとめ

| シーン               | supertest を使う？ |
| ----------------- | -------------- |
| Express API のテスト  | ✔ 使う           |
| Nest.js の API テスト | ✔ 使う（よく使われる）   |
| Next.js のフロントテスト  | ✘ 使わない         |
| 外部 API をモックしたい    | △（場合による）       |

---

### supertest は…

> **Express API を “自動で実行してテストするためのツール”**

### 何ができる？

* POST/GET など API を簡単に叩ける
* JSON ボディを送れる
* ステータスコードチェックできる
* レスポンス内容をテストできる

### どう使う？

```ts
request(app).post("/path").send({...})
```