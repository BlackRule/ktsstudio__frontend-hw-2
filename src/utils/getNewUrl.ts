import * as qs from "qs";

type ValueOf<T> = T[keyof T];

export const getNewURL=(paramName:string,value:ValueOf<qs.ParsedQs>,prevParams:qs.ParsedQs):string=>{
    const n={...prevParams,[paramName]:value}
    return qs.stringify(n,{addQueryPrefix:true})
}