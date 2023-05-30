import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // router-dom kütüphanesi için
import { ChakraProvider } from "@chakra-ui/react"; // chakra-ui kütüphanesi için
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // react-query kütüphanesi için
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false, //mount anında gereksiz refetch işleminden kurtulmak için
      refetchOnWindowFocus: false, //tarayıcı içinde farklı tablerden geri gelince refetch işleminden kurtulmak için
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
