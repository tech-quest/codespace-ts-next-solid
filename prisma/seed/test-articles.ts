import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestArticles = async () => {
  await prisma.article.create({
    data: {
      title: 'Tech Quest 学習1日目',
      content:
        'Tech Quest に入学した！\nプログラミングは未経験だけど頑張ってできるようになりたいな。\n\n1日目の今日はPCのセットアップをしたり、今後の学習の進め方などをレクチャーしてもらった。\n明日から本格的な学習がスタートするみたい！\n\n緊張するけど頑張るぞ〜〜〜！！！！',
      category: 'プログラミング',
      status: '公開',
      createdAt: new Date('2023-10-01 10:00:00'),
      updatedAt: new Date('2023-10-01 10:00:00'),
    },
  });
  await prisma.article.create({
    data: {
      title: '四つ葉のクローバー',
      content:
        '気分転換で土手に散歩しに行った。\nボーっと川を見てくつろいで、ふと近くに映えてるクローバーを見てみたら四葉のクローバーだった！\n\n普段なら全然見もしないのにすごい偶然！明日からも頑張ろう！',
      category: '日常',
      status: '公開',
      createdAt: new Date('2023-10-01 18:00:00'),
      updatedAt: new Date('2023-10-01 18:00:00'),
    },
  });
  await prisma.article.create({
    data: {
      title: 'Tech Quest 学習2日目',
      content:
        'Tech Quest でのプログラミング学習2日目！\n\n今日から本格的にプログラミングの学習が始まった。\nまずはWebアプリの基本処理となる CRUD というのを学ぶらしい。\nCRUD というのは「Create(作成)」「Read(読み取り)」「Update(更新)」「Delete(削除)」の略で、\n普段使っているWebアプリも基本的にはこれらの処理をDB(データベース)に対して行うことで表示してるらしい！\nうーん...難しそうww\n\nでも確かに普段使ってる X も「ツイート(Create)」「タイムライン(Read)」「ツイートの削除(Delete)」だし、\nプロフィールとかであれば「変更(Update)」できるなって考えたら「もしかして自分でも作れる」って思えてきた！\n\nうおおおおお！頑張るぞ〜〜〜！！！！',
      category: 'プログラミング',
      status: '公開',
      createdAt: new Date('2023-10-02 10:00:00'),
      updatedAt: new Date('2023-10-02 10:00:00'),
    },
  });
  await prisma.article.create({
    data: {
      title: 'Tech Quest 学習3日目',
      content: 'Tech Quest でのプログラミング学習2日目！\n\n学習したことを後で書く',
      category: 'プログラミング',
      status: '下書き',
      createdAt: new Date('2023-10-03 10:00:00'),
      updatedAt: new Date('2023-10-03 10:00:00'),
    },
  });
};
