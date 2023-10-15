import { LoginArgs, LoginResponse } from './auth.types.ts'

import { baseApi } from '@/services/base-api.ts'

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<any | null | { success: boolean }, void>({
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `v1/auth/me`,
          method: 'GET',
        })

        if (result.error) {
          return { data: { success: false } }
        }

        return { data: result.data } as { data: any }
      },
      extraOptions: {
        maxRetries: 0,
      },
      providesTags: ['Me'],
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: args => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: {
          args,
        },
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation } = authService
