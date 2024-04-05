import { useEffect, useState } from 'react';

import { useMutateFetch } from '~/features/app/hooks/use-mutate-fetch';

type ApiResponseData = { id: string };

export const useUpdateArticleApi = (id: string) => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { data, error, studyError, isLoading, mutate } = useMutateFetch<ApiResponseData>('put', {
    url: `/api/admin/articles/${id}`,
  });

  useEffect(() => {
    if (!data) return;

    if (error) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
  }, [data, error]);

  return { success, error, studyError, isUpdating: isLoading, updateArticle: mutate };
};
