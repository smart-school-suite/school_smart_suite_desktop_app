import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/utility.css";
import "./styles/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/media.css";
import "./styles/transition.css"
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/authContext";
import Links from "./routers/Links";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationFetcher from "./components/BackgroundFetchers/BackgroundNotificationFetch";
  //if (import.meta.env.MODE === 'development') {
   // const { default: whyDidYouRender } = await import('@welldone-software/why-did-you-render');
   // whyDidYouRender(React, {
      //trackAllPureComponents: true,
      //trackHooks: true,
    //});
 // }
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    },
    mutations: {
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationFetcher />
          <Links />
          </QueryClientProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
