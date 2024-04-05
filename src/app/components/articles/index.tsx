import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import lifeImage from '~/app/assets/images/picture-article-life.jpg';
import programmingImage from '~/app/assets/images/picture-article-programming.jpg';
import { MyChip } from '~/components/elements/chips/chip';
import { MyFluidImage } from '~/components/elements/images/fluid-image';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyTabs } from '~/components/surface/navigations/tabs';
import { ArticleUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

const tabItems = [
  { value: 'すべて', label: 'すべて' },
  { value: 'プログラミング', label: 'プログラミング' },
  { value: '日常', label: '日常' },
];

export const MyArticles = () => {
  const [articles, setArticles] = useState<ArticleUiModel[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    fetch('/api/articles', { method: 'GET', mode: 'cors' })
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          return setError(json.error ?? { message: '原因不明のエラーが発生しました。' });
        }

        const data: ApiResponseData[] = json.data;
        const articles = data.map(convertToUiModel);

        setArticles(articles);
      })
      .catch(() => {
        setError({
          message: '通信エラーが発生しました。ネットワーク環境を確認するか、時間を置いて再度アクセスしてください。',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <MyAlertMessage color="error">{error.message}</MyAlertMessage>;
  }

  if (!articles || !articles.length) {
    return <div>記事がありません。作成をして記事を残しましょう！</div>;
  }

  const filterArticles = (value: string) => {
    return articles.filter((article) => article.category === value);
  };
  const activeArticles = activeTab === 'すべて' ? articles : filterArticles(activeTab);

  return (
    <div className={styles.root}>
      <MyTabs items={tabItems} value={activeTab} onChange={handleTabChange} />
      <div className={styles.articles}>
        {activeArticles.length ? (
          activeArticles.map((article) => {
            const image = article.category === 'プログラミング' ? programmingImage : lifeImage;
            const chipColor = article.category === 'プログラミング' ? 'primary' : 'secondary';

            return (
              <article key={article.id} className={styles.article}>
                <Link href={`/detail/${article.id}`} className={styles.link}>
                  <div className={styles.body}>
                    <h2>{article.title}</h2>
                    <div className={styles.tags}>
                      <MyChip label={article.category} color={chipColor} />
                    </div>
                    <div className={styles.datetime}>{article.createdAt}</div>
                  </div>
                  <figure className={styles.image}>
                    <MyFluidImage src={image} />
                  </figure>
                </Link>
              </article>
            );
          })
        ) : (
          <div>該当の記事がありません</div>
        )}
      </div>
    </div>
  );
};

type ApiResponseData = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const convertToUiModel = (data: ApiResponseData): ArticleUiModel => {
  return {
    id: data.id,
    title: data.title,
    category: data.category,
    status: data.status,
    createdAt: data.createdAt,
  };
};
