export type CollectionModel<K extends string | number, T> = {
  entities: Record<K, T>;
  //order должно иметь имя keys
  order: K[];
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  entities: {},
  order: [],
})

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K,
  normalizeElement: <F>(from: F) => T
): CollectionModel<K, T> => {
  const list: T[] = []
  for (const item of elements) {
    list.push(normalizeElement(item))
  }
  const collection = getInitialCollectionModel()
  list.forEach((el) => {
    const id = getKeyForElement(el)
    collection.order.push(id)
    collection.entities[id] = el
  })
  return collection
}
export const linearizeCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el])
