import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    SingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["books"],
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
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
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
    // save user 

    SaveUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),

    SingleUser: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: ["books"],
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
  useUpdateBookMutation,
  useSaveUserMutation,
  useSingleUserQuery
} = productApi;
