import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// containers
// auth
import SignUpContainer from "../auth/signup";
import SlackSignUpOAuthContainer from "../auth/slack-signup-oauth";
import LoginContainer from "../auth/login";
import SlackLoginOAuthContainer from "../auth/slack-login-oauth";

// dashboard
import DashboardGettingStartedContainer from "../dashboard/getting-started";
import DashboardOverviewContainer from "../dashboard/overview";
import DashboardInsightsContainer from "../dashboard/insights";
import DashboardActivityContainer from "../dashboard/activity";

// recognition
import RecognitionTeamsContainer from "../recognition/teams";
import RecognitionTeamDetailsContainer from "../recognition/teams/id";
import RecognitionCompanyValuesContainer from "../recognition/company-values";

// awards
import AwardInsightsContainer from "../awards/insights";
import AwardSettingsContainer from "../awards/settings";

// rewards
import RewardInsightsContainer from "../rewards/insights";
import RewardCatalogContainer from "../rewards/catalog";
import RewardSettingsContainer from "../rewards/settings";

// billing
import BillingRewardsContainer from "../billing/rewards";
import BillingSubscriptionContainer from "../billing/subscription";
import BillingInvoicesContainer from "../billing/invoices";

// users
import UsersAllContainer from "../users/all";

// settings
import SettingsTeamContainer from "../settings/team";

// test
import Test from "./test";

// components
import ProtectedRoute from "../../components/ProtectedRoute";
import PageNotFound from "../../components/PageNotFound";
import Spinner from "../../components/Spinner";
import NavBar from "../../components/NavBar";
import { CHEERSLY_TOKEN } from "../../utils/constants";

const RoutesContainer = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const isAppLoading = localStorage.getItem(CHEERSLY_TOKEN) && !isLoggedIn;

  return (
    <BrowserRouter>
      <div className="flex">
        {isLoggedIn ? <NavBar /> : null}

        {isAppLoading ? (
          <div className="mt-10 w-full flex justify-center">
            <Spinner loading={isAppLoading} />
          </div>
        ) : (
          <div className="p-4 w-full">
            <Routes>
              <Route path="/test" element={<Test />} />

              {/* Auth Routes */}
              <Route path="/signup" element={<SignUpContainer />} />

              <Route
                path="/signup/auth"
                element={<SlackSignUpOAuthContainer />}
              />
              <Route path="/login" element={<LoginContainer />} />

              <Route
                path="/login/auth"
                element={<SlackLoginOAuthContainer />}
              />

              {/* Dashboard Routes */}

              <Route
                path="/dashboard/getting-started"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DashboardGettingStartedContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/overview"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DashboardOverviewContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/insights"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DashboardInsightsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/activity"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DashboardActivityContainer />
                  </ProtectedRoute>
                }
              />

              {/* Recognition Routes */}
              <Route
                path="/recognition/teams"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RecognitionTeamsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/recognition/teams/:teamId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RecognitionTeamDetailsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/recognition/company-values"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RecognitionCompanyValuesContainer />
                  </ProtectedRoute>
                }
              />

              {/* Awards Routes */}
              <Route
                path="/awards/insights"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AwardInsightsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/awards/settings"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AwardSettingsContainer />
                  </ProtectedRoute>
                }
              />

              {/* Rewards Routes */}
              <Route
                path="/rewards/insights"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RewardInsightsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/rewards/catalog"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RewardCatalogContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/rewards/settings"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <RewardSettingsContainer />
                  </ProtectedRoute>
                }
              />

              {/* Billing Routes */}
              <Route
                path="/billing/rewards"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BillingRewardsContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/billing/subscription"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BillingSubscriptionContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/billing/invoices"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BillingInvoicesContainer />
                  </ProtectedRoute>
                }
              />

              {/* Users Routes */}
              <Route
                path="/users/all"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <UsersAllContainer />
                  </ProtectedRoute>
                }
              />

              {/* Settings Routes */}
              <Route
                path="/settings/team"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SettingsTeamContainer />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to={isLoggedIn ? "/dashboard/overview" : "/login"}
                  />
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default RoutesContainer;
