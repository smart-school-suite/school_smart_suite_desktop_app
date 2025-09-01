import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/utility.css";
import "./styles/global.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/transition.css";
import "./styles/responsive.css"
//import "./styles/component.css"
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/authContext";
import Links from "./routers/Links";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
            <Links />
          </QueryClientProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
