import { api } from "./index";

const likedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLikedProducts: build.mutation({
      query: (id) => ({
        url: `/product/66e83f10a469f0e41ad9ab92/like`,
        method: "PATCH",
        body : id
      }),
    }),
  }),
});

export const { useGetLikedProductsMutation } = likedApi;