import styles from './Loader.module.scss'

const classNames = require('classnames')

export enum LoaderSize {
  l = 'l',
  m = 'm',
  s = 's'
}

type LoaderProps = {
  className?: string;
  loading?: boolean;
  size?: LoaderSize;
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
  ) : null
}
