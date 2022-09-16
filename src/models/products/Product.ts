import { RatingApi, RatingModel, normalizeRating } from './rating'

export type ProductApi = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingApi;
  title: string;
};

export type ProductModel = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingModel;
  title: string;
};

export const normalizeProduct = (from: ProductApi): ProductModel => {
  return {
    category: from.category,
    description: from.description,
    id: from.id,
    image: from.image,
    price: from.price,
    rating: normalizeRating(from.rating),
    title: from.title,
  }
}
