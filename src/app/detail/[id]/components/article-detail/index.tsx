import { MyMultilineString } from '~/components/elements/typographies/multiline-string';
import { ArticleDetailUiModel } from '~/features/article/ui-models/article';

import styles from './styles.module.css';

type Props = { article: ArticleDetailUiModel };

export const MyArticleDetail = ({ article }: Props) => {
  return (
    <div className={styles.root}>
      <MyMultilineString value={article.content} />
    </div>
  );
};
