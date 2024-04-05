'use client';

import { useEffect, useState } from 'react';

import lifeImage from '~/app/assets/images/picture-article-life.jpg';
import programmingImage from '~/app/assets/images/picture-article-programming.jpg';
import { MyJumbotron } from '~/app/shared/components/jumbotron';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyContainer } from '~/features/app/components/container';
import { MyPageContainer } from '~/features/app/components/page-container';
import { ArticleDetailUiModel } from '~/features/article/ui-models/article';

import { MyArticleActions } from './components/article-actions';
import { MyArticleDetail } from './components/article-detail';

type Params = {
  id: string;
};

export default function ArticleDetailPage({ params }: { params: Params }) {
  const [article, setArticle] = useState<ArticleDetailUiModel | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/articles/${params.id}`, { method: 'GET', mode: 'cors' })
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          return setError(json.error ?? { message: '原因不明のエラーが発生しました。' });
        }

        const data: ApiResponseData = json.data;

        const article = convertToUiModel(data);

        setArticle(article);
      })
      .catch(() => {
        setError({
          message: '通信エラーが発生しました。ネットワーク環境を確認するか、時間を置いて再度アクセスしてください。',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
    <MyPageContainer>
      <MyJumbotron
        heading={article?.title ?? ''}
        createdAt={article?.createdAt ?? ''}
        updatedAt={article?.updatedAt ?? ''}
        image={article ? (article.category === 'プログラミング' ? programmingImage : lifeImage) : undefined}
        tag={article?.category}
      />
      <MyContainer>
        {error && <MyAlertMessage color="error">{error.message}</MyAlertMessage>}
        {isLoading && <div>読み込み中...</div>}
        {article && <MyArticleDetail article={article} />}
        <MyArticleActions />
      </MyContainer>
    </MyPageContainer>
  );
}

type ApiResponseData = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const convertToUiModel = (data: ApiResponseData): ArticleDetailUiModel => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    category: data.category,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
