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

export const MySelectField = ({ label, items, name, value, onChange, error }: Props) => {
  const errorId = `${name}-error`;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className={fieldStyles.row}>
      <div className={fieldStyles.label}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div className={fieldStyles.field}>
        <div className={styles.select}>
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={styles.input}
            aria-invalid={Boolean(error)}
            aria-errormessage={error ? errorId : undefined}
          >
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <MyErrorMessage id={errorId} message={error} />}
    </div>
  );
};
