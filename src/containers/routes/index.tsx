import React from "react";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// containers
import LoginContainer from "../login";
import SlackOAuthContainer from "../login/slack-oauth";
import DashboardContainer from "../dashboard";
// components
import ProtectedRoute from "../../components/ProtectedRoute";
import PageNotFound from "../../components/PageNotFound";
import Spinner from "../../components/Spinner";
import NavBar from "../../components/NavBar";
import { CHEERSLY_TOKEN } from "../../utils/constants";

const RoutesContainer = () => {
  // const { isLoggedIn } = useSelector((state: any) => state.login);

  const isLoggedIn = true;

  const isAppLoading = localStorage.getItem(CHEERSLY_TOKEN) && !isLoggedIn;

  return (
    <HashRouter>
      {isLoggedIn ? <NavBar /> : null}

      {isAppLoading ? (
        <div className="flex justify-center">
          <Spinner loading={isAppLoading} />
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginContainer />} />

          <Route path="/login/slack" element={<SlackOAuthContainer />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DashboardContainer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </HashRouter>
  );
};

export default RoutesContainer;
