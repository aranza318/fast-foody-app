import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const receiptApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({...receipt})=>({
                url: 'receipts.json',
                method: 'POST',
                body:receipt
            })
        }),
        getReceipts: builder.query({
            query: () => ({
                url: 'receipts.json',
                method: 'GET',
            }),
            transformResponse: (response) => 
                response 
                    ? Object.keys(response).map(key => ({ id: key, ...response[key] })) 
                    : []
        })
        
    })

})

export const {usePostReceiptMutation, useGetReceiptsQuery} = receiptApi