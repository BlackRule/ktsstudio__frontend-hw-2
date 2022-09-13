import {
  ComponentProps,
  DetailedHTMLProps,
  HTMLAttributes,
  JSXElementConstructor,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './MultiDropdown.module.scss';
import { Button, ButtonSkin } from 'components/Button/Button';

export type Option = {
  key: string;
  value: string;
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type MultiDropdownProps = Omit<
  ComponentProps<typeof Button>,
  'onChange' | 'value'
> & {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  generateValueElement: (options: Option[]) => JSXElementConstructor<DivProps>;
  valueProps?: DivProps;
  optionsProps?: DivProps;
};

export const MultiDropdown = ({
  options,
  value,
  onChange,
  generateValueElement,
  disabled = false,
  valueProps,
  optionsProps,
  ...props
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function includes(opts: Option[], opt: Option) {
    return opts.some((o) => opt.key === o.key);
  }

  const Value = generateValueElement(value);
  return (
    <Button
      {...props}
      skin={ButtonSkin.secondary}
      className={classNames(styles.MultiDropdown, props.className)}
    >
      <Value
        {...valueProps}
        className={classNames(valueProps?.className, styles.value)}
        onClick={(e) => {
          setIsOpen((v) => !v);
          if (valueProps?.onClick) {
            valueProps.onClick(e);
          }
        }}
      />
      {isOpen && !disabled ? (
        <div
          {...optionsProps}
          className={classNames(styles.optionsParent, optionsProps?.className)}
        >
          {options.map((option) => (
            <div
              key={option.key}
              className={classNames(styles.option, {
                [styles.selected]: includes(value, option),
              })}
              onClick={() => {
                if (!includes(value, option)) {
                  onChange([...value, option]);
                } else {
                  onChange(value.filter((o) => o.key !== option.key));
                }
              }}
            >
              {option.value}
            </div>
          ))}
        </div>
      ) : null}
    </Button>
  );
};
