/** Пропсы, которые принимает компонент WithLoader */
import {Loader} from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
    loading: boolean;
}>;
export const WithLoader = ({children,loading=true}:WithLoaderProps) => {
    return (<div>
        {children}
        <Loader loading={loading}/>
    </div>)
};