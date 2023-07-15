import { api } from "../../api/apiSlice";

const listApi = api.injectEndpoints({
  endpoints: (builder) => ({
    SaveUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),

    SingleUser: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: ["wishlist", "myList"],
    }),
    postWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    postMyList: builder.mutation({
      query: (data) => ({
        url: `/myList`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["myList"],
    }),
    updateMyList: builder.mutation({
      query: ({ email, id }) => ({
        url: `/myList/${email}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["myList"],
    }),
  }),
});

export const {
  useSaveUserMutation,
  useSingleUserQuery,
  usePostWishlistMutation,
  usePostMyListMutation,
  useUpdateMyListMutation,
} = listApi;