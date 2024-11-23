import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Make sure you import fetchBaseQuery
import toast from "react-hot-toast";

const KEY = "29e494f1837c47baa9e19c559";
const tagTypesarray = [
  "students",
  "teachers",
];
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  prepareHeaders: (headers) => {
    headers.set("SCHOOL_BRANCH_KEY", KEY);
    return headers;
  },
  credentials: "include",
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    toast.error(result.error.message || "An error occurred");
    console.error(result.error);
  }

  return result;
};

export const postApiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
      createStudent: builder.mutation({
        query: (newStudent) => ({
          url: "api/student/create",
          method: 'POST',
          body: newStudent,
        }),
        
        invalidatesTags: ["students"],
      }),
    }),
});

// Export hooks for usage in functional components
export const {
   
} = postApiSlice;