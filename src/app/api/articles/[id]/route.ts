import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/features/app/prisma';
import { DateUtils } from '~/features/app/utils';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 404 });
  }

  const record = await db.article.findUnique({ where: { id } });
  if (record === null) {
    return NextResponse.json({ error: { message: '記事が見つかりませんでした' } }, { status: 404 });
  }

  // Memo: 公開されていない記事は 404 Not Found 扱いにする
  if (record.status !== '公開') {
    return NextResponse.json({ error: { message: '記事が見つかりませんでした' } }, { status: 404 });
  }

  const article = {
    id: record.id,
    title: record.title,
    content: record.content,
    category: record.category,
    status: record.status,
    createdAt: DateUtils.formatDateInJa(record.createdAt),
    updatedAt: DateUtils.formatDateInJa(record.updatedAt),
  };

  return NextResponse.json({ data: article });
}
