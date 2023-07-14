import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    SingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery } = productApi;
