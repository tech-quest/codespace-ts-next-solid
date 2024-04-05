export type ArticleUiModel = {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
};
export type ArticleDetailUiModel = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleCategory = 'プログラミング' | '日常';
export type ArticleStatus = '公開' | '下書き';

export const categoryItems = [
  { value: 'プログラミング', label: 'プログラミング' },
  { value: '日常', label: '日常' },
];
export const statusItems = [
  { value: '公開', label: '公開' },
  { value: '下書き', label: '下書き' },
];
