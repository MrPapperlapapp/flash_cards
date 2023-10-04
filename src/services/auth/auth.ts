import { baseApi } from '@/services/base-api.ts'
import {
  LogInBodyType,
  LogInResponseType,
  ProfileBodyType,
  SignUpBodyType,
  UserType,
} from './auth.types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserType | undefined, void>({
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `v1/auth/me`,
          method: 'GET',
        })
        if (result.error) {
          // but refetch on another error
          return { data: undefined }
        }
        return { data: result.data as UserType }
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
    logOut: builder.mutation<void, void>({
      query: () => {
        return {
          url: 'v1/auth/logout',
          method: 'POST',
        }
      },
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation<UserType, SignUpBodyType>({
      query: userData => {
        return {
          url: 'v1/auth/sign-up',
          method: 'POST',
          body: userData,
        }
      },
      invalidatesTags: ['Me'],
    }),
    updateProfile: builder.mutation<UserType, ProfileBodyType>({
      query: patch => {
        const formData = new FormData()
        patch.name && formData.append('name', patch.name)
        patch.email && formData.append('email', patch.email)
        patch.avatar && formData.append('avatar', patch.avatar)
        return {
          url: 'v1/auth/me',
          method: 'PATCH',
          formData: true,
          body: formData,
        }
      },
      async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('getMe', undefined, draft => {
            if (draft && name) {
              draft.name = name
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Me'],
    }),
  }),
})

export const {
  useGetMeQuery,
  useLogInMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  useLogOutMutation,
} = authApi
