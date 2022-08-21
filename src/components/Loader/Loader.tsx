const classNames = require('classnames');

enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
}

type LoaderProps = {
    loading?: boolean;
    size?: LoaderSize;
    className?: string;
};
export const Loader = ({loading=true,size=LoaderSize.m,className}:LoaderProps) => {
    return loading ? (<div className={classNames(`loader_size-${size}`, className)}></div>):null
};