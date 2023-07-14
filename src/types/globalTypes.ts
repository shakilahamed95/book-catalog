export interface IBooks {
  _id: number;
  image: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews?: Array<string>;
}
