type Rating={
    rate: number,
    count: number
}

type Product = {
    id:number,
    title:string,
    description:string,
    category:string,
    price:number,
    image:string,
    rating: Rating
}

export default Product