import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    SingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    AddBook: builder.mutation({
      query: (data) => ({
        url: "/book",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery,useAddBookMutation } = productApi;
