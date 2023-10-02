import { baseApi } from '@/services/base-api.ts'
import {
  LogInBodyType,
  LogInResponseType,
  SignUpBodyType,
  SignUpResponseType,
} from './auth.types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<any | null, void>({
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `v1/auth/me`,
          method: 'GET',
        })
        if (result.error) {
          // but refetch on another error
          return { data: null }
        }
        return { data: result.data }
      },
      providesTags: ['Me'],
    }),
    logIn: builder.mutation<LogInResponseType, LogInBodyType>({
      query: ({ email, password, rememberMe }) => {
        return {
          url: 'v1/auth/login',
          method: 'POST',
          body: {
            email,
            password,
            rememberMe,
          },
        }
      },
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpBodyType>({
      query: body => {
        return {
          url: 'v1/auth/sign-up',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Me'],
    }),
  }),
})

export const { useGetMeQuery, useLogInMutation, useSignUpMutation } = authApi
