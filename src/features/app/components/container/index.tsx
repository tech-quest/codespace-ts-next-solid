import { Slot } from '@radix-ui/react-slot';

import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
  id?: string;
  asChild?: true;
};

export const MyContainer = ({ children, id, asChild }: Props) => {
  const RootComponent = asChild ? Slot : 'div';

  return (
    <RootComponent id={id} className={styles.root}>
      {children}
    </RootComponent>
  );
};
