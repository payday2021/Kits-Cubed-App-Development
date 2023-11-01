import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:8080'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Signups'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        addNewOrder: builder.mutation({
            query: initialOrder => ({
                url: '/orders/add',
                method: 'POST',
                body: initialOrder
            })
        }),
        getEvents: builder.query({
            query: () => '/events/all',
        }),
        isUserRegistered: builder.query({
            query: ({ event_id, participant }) => `/events/signup/confirmation?event_id=${event_id}&participant=${participant}`,
            providesTags: ['Signups']
        }),
        eventSignup: builder.mutation({
            query: signupInfo => ({
                url: '/events/signup',
                method: 'POST',
                body: signupInfo
            }),
            invalidatesTags: ['Signups']
        }),

    })
})

export const {
    useAddNewOrderMutation,
    useGetEventsQuery,
    useEventSignupMutation,
    useIsUserRegisteredQuery,
} = apiSlice;