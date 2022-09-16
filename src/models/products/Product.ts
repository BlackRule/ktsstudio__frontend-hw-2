import { RatingApi, RatingModel, normalizeRating } from './rating';

export type ProductApi = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: RatingApi;
};

export type ProductModel = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: RatingModel;
};

export const normalizeProduct = (from: ProductApi): ProductModel => {
  return {
    id: from.id,
    title: from.title,
    description: from.description,
    category: from.category,
    price: from.price,
    image: from.image,
    rating: normalizeRating(from.rating),
  };
};
