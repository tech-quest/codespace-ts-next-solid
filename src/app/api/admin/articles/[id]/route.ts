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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, content, category, status } = await request.json();

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 400 });
  }

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

  try {
    const record = await db.article.update({ where: { id }, data: { title, content, category, status } });

    return NextResponse.json({ data: { id: record.id.toString(10) } });
  } catch {
    return NextResponse.json({ error: { message: 'データベース操作に失敗しました。' } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 404 });
  }

  try {
    const record = await db.article.delete({ where: { id } });

    return NextResponse.json({ data: { id: record.id.toString(10) } });
  } catch {
    return NextResponse.json({ error: { message: 'データベース操作に失敗しました。' } }, { status: 500 });
  }
}
