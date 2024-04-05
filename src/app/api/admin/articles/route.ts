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

  return NextResponse.json({ data: articles });
}

export async function POST(request: NextRequest) {
  const { title, content, category, status } = await request.json();

  const requiredMessage = '未入力の内容があります';

  if (title === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  if (content === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  if (category === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  if (status === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  const record = await db.article.create({ data: { title, content, category, status } });

  return NextResponse.json({ data: { id: record.id.toString(10) } });
}
