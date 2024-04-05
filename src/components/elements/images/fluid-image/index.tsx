import { StaticImageData } from 'next/image';

import { MyPlainImage } from '~/components/elements/images/plain-image';

import styles from './styles.module.css';

type Props = {
  src: string | StaticImageData;
  alt?: string;
};

export const MyFluidImage = ({ src, alt }: Props) => {
  return <MyPlainImage src={src} alt={alt} className={styles.root} />;
};
