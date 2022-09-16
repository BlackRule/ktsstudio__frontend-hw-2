import styles from './Loader.module.scss';

const classNames = require('classnames');

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  //Surrounding div is needed so that transforms applied to .className aren't overridden by .Loader
  return loading ? (
    <div className={className}>
      <div
        className={classNames(styles.Loader, styles[`Loader-${size}`])}
      ></div>
    </div>
  ) : null;
};
