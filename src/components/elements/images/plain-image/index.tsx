import clsx from 'clsx';
import { StaticImageData } from 'next/image';

import styles from './styles.module.css';

type Props = {
  src: string | StaticImageData;
  alt?: string;
  className?: string;
};

export const MyPlainImage = ({ src, alt, className }: Props) => {
  return (
    <img src={typeof src === 'string' ? src : src.src} alt={alt ?? ''} className={clsx([styles.root, className])} />
  );
};
