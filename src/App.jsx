import React, { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import RecipeDetail from "./pages/detail";
import { apiUrl } from "./api/apiUrl";

import "./App.scss";

export const NavigationStateContext = React.createContext();

const RequireNoAuth = () => {
  const isAuth = localStorage.getItem("access_token");

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route
            path="/"
            element={
              <HomePage
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                apiUrl={apiUrl}
              />
            }
          />

          <Route
            path="/recipe/:category-:id-:name"
            element={
              <RecipeDetail apiUrl={apiUrl} setCurrentPage={setCurrentPage} />
            }
          />

          {/* auth route */}
          <Route element={<RequireNoAuth />}>
            <Route
              path="/login"
              element={
                <Login apiUrl={apiUrl} setCurrentPage={setCurrentPage} />
              }
            />
            
            <Route
              path="/register"
              element={
                <Register apiUrl={apiUrl} setCurrentPage={setCurrentPage} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
