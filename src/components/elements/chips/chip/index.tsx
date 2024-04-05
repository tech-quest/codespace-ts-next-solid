import clsx from 'clsx';

import styles from './styles.module.css';

type Props = {
  label: string;
  color: 'primary' | 'secondary';
};

export const MyChip = ({ label, color }: Props) => {
  return <div className={clsx([styles.root, styles[color]])}>{label}</div>;
};
