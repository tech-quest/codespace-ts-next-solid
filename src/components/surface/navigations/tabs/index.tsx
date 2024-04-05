import styles from './styles.module.css';

type TabItem = {
  value: string;
  label: string;
};

type Props = {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
};

export const MyTabs = ({ items, value, onChange }: Props) => {
  const handleClick = (value: string) => {
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            className={styles.tab}
            role="tab"
            aria-selected={item.value === value}
            onClick={() => handleClick(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
