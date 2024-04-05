import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/features/app/prisma';
import { DateUtils } from '~/features/app/utils';
import { ArticleUtils } from '~/features/article/utils';

export async function GET() {
  const records = await db.article.findMany();

  const sorted = ArticleUtils.sortArticlesByNewestFirst(records);

  const articles = sorted.map((record) => {
    return {
      id: record.id,
      title: record.title,
      content: record.content,
      category: record.category,
      status: record.status,
      createdAt: DateUtils.formatDateInJa(record.createdAt),
      updatedAt: DateUtils.formatDateInJa(record.updatedAt),
    };
  });

  // Memo: ユーザーには公開されている記事のみを返す
  const published = articles.filter((article) => article.status === '公開');

  return NextResponse.json({ data: published });
}
