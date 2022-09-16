declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

//TODO merge with png somehow
declare module '*.svg' {
  const content: string
  export default content
}
