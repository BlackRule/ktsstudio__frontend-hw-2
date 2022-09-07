import { useEffect, useState } from "react";
import { debounce } from "lodash";

export interface Size {
    width: number; //TODO  | undefined google for it with SSR
    height: number;
}

const getWindowDimensions = ():Size => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

const useWindowSize=(delay = 100) =>{
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        const debouncedHandleResize = debounce(handleResize, delay);
        window.addEventListener("resize", debouncedHandleResize);
        return () => window.removeEventListener("resize", debouncedHandleResize);
    }, [delay]);

    return windowDimensions;
}

export default useWindowSize