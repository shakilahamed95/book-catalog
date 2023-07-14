import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
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
      invalidatesTags: ["books"],
    }),
    deleBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ["comments"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useAddBookMutation,
  useGetCommentQuery,
  usePostCommentMutation,
  useDeleBookMutation,
} = productApi;
