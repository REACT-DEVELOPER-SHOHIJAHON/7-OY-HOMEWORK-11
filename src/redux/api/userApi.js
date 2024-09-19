import { api } from "./index";

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/auth/profile"
      }),
    }),
     getUsers: build.query({
      query: () => ({
        url: "/admin/registered-users",
      })
     })
  }),
});

export const { useGetProfileQuery , useGetUsersQuery} = profileApi;