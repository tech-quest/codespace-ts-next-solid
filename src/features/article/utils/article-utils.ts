import { Article } from '@prisma/client';

export class ArticleUtils {
  static sortArticlesByNewestFirst(articles: Article[]): Article[] {
    const sorted = articles.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    return sorted;
  }
}
