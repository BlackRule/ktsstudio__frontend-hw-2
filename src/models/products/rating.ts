export type RatingApi = {
  count: number;
  rate: number;
};
export type RatingModel = {
  count: number;
  rate: number;
};

export const normalizeRating = (from: RatingApi): RatingModel => ({
  count: from.count,
  rate: from.rate,
})
