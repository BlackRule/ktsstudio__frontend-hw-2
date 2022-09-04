import {ProductApi, ProductModel} from "@models/products";

export type CollectionModel<K extends string|number,T>={
    //order должно иметь имя keys
    order:K[],
    entities:Record<K, T>
}

export const getInitialCollectionModel=():CollectionModel<any, any>=>({
    order:[],entities:{}
})

export const normalizeCollection=<K extends string|number,T>(elements:T[],
    getKeyForElement:(element:T)=>K,normalizeElement:( from: ProductApi)=> ProductModel):CollectionModel<K, T>=>{
    const list:T[]=[]
    for (const item of elements) {
        list.push(item)
    }
    const collection=getInitialCollectionModel()
    list.forEach((el)=>{
        const id=getKeyForElement(el)
        collection.order.push(id)
        collection.entities[id]=el
    })
    return collection
}
export const linearizeCollection=<K extends string|number,T>(elements:CollectionModel<K, T>):T[]=>elements.order.map((el)=>elements.entities[el])