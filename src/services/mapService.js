import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const mapApi = createApi({
    reducerPath: "mapApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        postPlace: builder.mutation({
            query: ({...place})=>({
                url: 'places.json',
                method: 'POST',
                body:place
            })
        }),
        getPlaces: builder.query({
            query: () => ({
                url: 'places.json',
                method: 'GET',
            }),
            transformResponse: (response) => 
                response 
                    ? Object.keys(response).map(key => ({ id: key, ...response[key] })) 
                    : []
        }),
        deletePlace: builder.mutation({
            query: (placeId) => ({
                url: `places/${placeId}.json`,
                method: 'DELETE',
            }),
        })   
    })

})

export const {usePostPlaceMutation, useGetPlacesQuery, useDeletePlaceMutation} = mapApi