export type RatingApi = {
    rate: number,
    count: number
}
export type RatingModel = {
    rate: number,
    count: number
}

export const normalizeRating=(from:RatingApi):RatingModel=>({
    rate:from.rate,
    count:from.count,
})