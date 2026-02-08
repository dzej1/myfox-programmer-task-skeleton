import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter, Outlet, Route, Routes, Navigate } from "react-router";
import MyReservationsRoute from "./feature/my-reservations/route";
import PersonalDataRoute from "./feature/personal-data/route";
import { AppNavbar } from "./components/app-navbar";

import "./global.css";

const link = new HttpLink({
  uri: "https://cmyp37vc53jlbv5wa3nrnez6mi0dktla.lambda-url.eu-central-1.on.aws/",
  headers: {
    "X-Api-Key": "da2-gcyvktbwpfhnznbpdaghdbyf7m",
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="preload" href="https://rsms.me/inter/inter.css" />
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/my-reservations" replace />}
          />
          <Route
            element={
              <>
                <AppNavbar />
                <Outlet />
              </>
            }
          >
            <Route path="/my-reservations" element={<MyReservationsRoute />} />
            <Route path="/personal-data" element={<PersonalDataRoute />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
