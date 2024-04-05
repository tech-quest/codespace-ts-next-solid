import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';

import styles from './styles.module.css';

export const MyArticleActions = () => {
  return (
    <div className={styles.root}>
      <div>
        <MyButton asChild>
          <Link href="/">一覧に戻る</Link>
        </MyButton>
      </div>
    </div>
  );
};
