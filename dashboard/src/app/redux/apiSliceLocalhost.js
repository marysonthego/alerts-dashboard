import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const Origin = 'http://localhost:3002'; //CORS Origin must be in server's whitelist

export const apiSlice = createApi({
  reducerPath: 'apiSlice',  //all data will be in Redux store at store.apiSlice
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  
  //baseQuery: fetchBaseQuery({ baseUrl: "/api" }),tagTypes: ['User', 'Locations', 'Friends'],
  keepUnusedDataFor: 5,
  //endpoints are calls to the Postgres server
  endpoints: builder => ({

    listCustomers: builder.query({
      //query is a call to '${baseUrl}/listcustomers'
      query: () => ({
      url: '/listcustomers',
      //Origin: Origin,
      providesTags: (result = [], error, arg) => 
      result
        ?[result.map(({custid}) => ({type: 'User', custid})), 'User']
        : ['User']
      }),
    }),

    getCustomerByCustid: builder.query({
      query: custid => ({
          url: `/getcustomerbycustid/${custid}`,
          //Origin: Origin,
          providesTags: (result, error, custid) => [{ type: 'User', custid }],
      }),
    }),

    checkCustomerEmail: builder.query ({
      query: (arg) => {
        const {custid, email} = arg;
        return {
        url: `/checkemail`,
        params: { custid, email },
        //Origin: Origin, 
        };
      },
    }),

    checkCustomerCell: builder.query ({
      query: (arg) => {
        const {custid, cell} = arg;
        return {
        url: `/checkcell`,
        params: { custid, cell },
        //Origin: Origin,
      };
    },
    }),

    addCustomer: builder.mutation({
      query: newUser => ({
        url: '/addcustomer',
        method: 'POST',
        //Origin: Origin,
        body: newUser
      }),
      //invalidatesTags: ['User']
    }),

    updateCustomer: builder.mutation({
      query: initialUser => ({
        url: '/updatecustomer',
        method: 'POST',
        //Origin: Origin,
        body: initialUser
      }),
      invalidatesTags: ['User']
    }),

    addLocation: builder.mutation({
      query: newLocation => ({
        url: '/addsubscription',
        method: 'POST',
        //Origin: Origin,
        body: newLocation
      }),
      invalidatesTags: ['Locations']
      //invalidatesTags: (result, error, custid) => [{type: 'Locations', custid: custid}]
    }),

    updateLocation: builder.mutation({
      query: newLocation => ({
        url: '/updatesubscription',
        method: 'POST',
        //Origin: Origin,
        body: newLocation
      }),
      invalidatesTags: [{type: 'Locations', id: 5}, 'Locations']
    }),

    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/deletesubscription/${id}`,
        method: 'DELETE',
        //Origin: Origin,
      invalidatesTags: [{type: 'Locations', id: 'LOCSBYCUSTID'}],
    }),
  }),

    getLocationById: builder.query({
      query: id => ({
        url: `/getlocationbyid/${id}`,
        //Origin: Origin,
      providesTags:((id) => ({type: 'Locations', id })),
      }),
    }),

    getLocationsByCustid: builder.query({
      query: custid => ({
        url: `/getlocationsbycustid/${custid}`,
        //Origin:Origin,
        providesTags: [{type: 'Locations', id: 'LOCSBYCUSTID'}],
      }),
    }),

    addFriend: builder.mutation({
      query: newFriend => ({
        url: '/addfriend',
        method: 'POST',
        //Origin: Origin,
        body: newFriend
      }),
      invalidatesTags: ['Friends']
    }),

    updateFriend: builder.mutation({
      query: newFriend => ({
        url: '/updatefriend',
        method: 'POST',
        //Origin: Origin,
        body: newFriend
      }),
      invalidatesTags: ['Friends']
    }),

    deleteFriend: builder.mutation({
      query: (id) => ({
        url: `/deletefriend/${id}`,
        method: 'DELETE',
        //Origin: Origin,
        invalidatesTags: ['Friends'],
      }),
    }),

    getFriendsByCustid: builder.query({
      query: custid => ({
      url: `/getfriendsbycustid/${custid}`,
      //Origin: Origin,
      providesTags: [{type: 'Friends', custid}]
      }),
    }),

    getZip: builder.query ({
      query: (arg) => {
        const {city, st} = arg;
        return {
        url: `/getzip`,
        params: { city, st },
        //Origin: Origin,
      };
    },
    }),

    findZip: builder.mutation({
      query: newLocation => ({
        url: `/findzip`,
        method: `POST`,
        //Origin: Origin,
        body: newLocation
      }),
      //invalidatesTages: ['Locations']
    })

  })
});
//auto-generated hooks for each endpoint. These hooks encapsulate the process of triggering a request when a component mounts, and re-rendering the component as the request is processed and data is available. We can export these hooks out of the API slice file for use in our React components.
export const { 
  useListCustomersQuery, 
  useGetCustomerByCustidQuery, 
  useAddCustomerMutation, 
  useUpdateCustomerMutation, 
  useCheckCustomerEmailQuery, 
  useCheckCustomerCellQuery,

  useGetLocationsByCustidQuery,
  useGetLocationByIdQuery,
  useAddLocationMutation, 
  useUpdateLocationMutation,
  useDeleteLocationMutation,

  useGetZipQuery,
  useFindZipMutation,

  useGetFriendsByCustidQuery,
  useAddFriendMutation, 
  useUpdateFriendMutation,
  useDeleteFriendMutation,
} = apiSlice;

