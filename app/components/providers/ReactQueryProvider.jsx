"use client"
import {QueryClientProvider,QueryClient}  from "react-query"

const queryClient=new QueryClient();

const ReactQueryProvider = ({children}) => {
  return (
   <QueryClientProvider client={queryClient}>
    {children}
   </QueryClientProvider>
  )
}

export default ReactQueryProvider