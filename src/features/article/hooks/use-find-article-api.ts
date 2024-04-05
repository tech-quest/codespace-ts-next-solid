import { useEffect, useState } from 'react';

import { useGetFetch } from '~/features/app/hooks/use-get-fetch';
import { ArticleDetailUiModel } from '~/features/article/ui-models/article';

type ApiResponseData = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const useFindArticleApi = (id: string, isAdmin?: boolean) => {
  const [article, setArticle] = useState<ArticleDetailUiModel | null>(null);

  const baseUrl = isAdmin ? '/api/admin' : '/api';
  const { data, error, studyError, isLoading, query } = useGetFetch<ApiResponseData>(`${baseUrl}/articles/${id}`);

  useEffect(() => {
    if (!data) return;

    setArticle(convertToUiModel(data));
  }, [data]);

  return { article, error, studyError, isLoading, query };
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
