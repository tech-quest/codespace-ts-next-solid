import clsx from 'clsx';

import fieldStyles from '~/components/elements/forms/shared/field-styles.module.css';
import { MyErrorMessage } from '~/components/elements/typographies/error-message';

import { MyMultilineString } from '../../typographies/multiline-string';
import styles from './styles.module.css';

type RadioItem = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  items: RadioItem[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export const MyRadioField = ({ label, items, name, value, onChange, error }: Props) => {
  const errorId = `${name}-error`;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className={fieldStyles.row}>
      <div className={fieldStyles.label}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div className={styles.items}>
        {items.map((item, index) => {
          const id = `${name}-${index}`;
          return (
            <div key={item.value}>
              <input
                type="radio"
                id={id}
                name={name}
                value={item.value}
                onChange={handleChange}
                className={clsx([styles.input, value === item.value && styles.checked])}
                checked={value === item.value}
              />
              <label htmlFor={id} className={styles.label}>
                <MyMultilineString value={item.label} />
              </label>
            </div>
          );
        })}
      </div>
      {error && <MyErrorMessage id={errorId} message={error} />}
    </div>
  );
};
