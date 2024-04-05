import { createTestArticles } from './test-articles';

// テストデータ登録用関数
const seed = async () => {
  await createTestArticles();
};

seed();
