import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ProtectedRoute from "../../components/ProtectedRoute";
import PageNotFound from "../../components/PageNotFound";
import AuthContainer from "../auth";
import LoginContainer from "../auth/login";
import AccountContainer from "../account";
import AdminSettingsContainer from "../admin-settings";
import LeaderboardContainer from "../leaderboard";
import CompanyValuesContainer from "../company-values";
import RewardsContainer from "../rewards";
import MatchMomentsContainer from "../match-moments";
// import SubscriptionContainer from "../account/subscription";
// import ProfileContainer from "../account/profile";
// import SettingsContainer from "../settings";
// import TrialExpiredContainer from "../trial-expired";
// import SubscriptionExpiredContainer from "../subscription-expired";
import NavBar from "../../components/NavBar";
import ProfileSideBar from "../../components/ProfileSideBar";
import Spinner from "../../components/Spinner";
import { CHEERSLY_TOKEN } from "../../utils/constants";
import { setSelectedNavSectionAction } from "./state/actions";
import { NAVIGATION_SECTION } from "../../enums/navigationRoutes";
import "./styles.css";

const RoutesContainer = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, slackUserData, role } = useSelector(
    (state) => state.auth
  );

  const {
    cheersStat: { cheersGiven, cheersReceived, cheersRedeemable },
  } = useSelector((state) => state.root);

  const { selectedNavSection } = useSelector((state) => state.root);

  const [profileSideBarAnchorEl, setProfileSideBarAnchorEl] = useState(null);

  const userName =
    slackUserData && slackUserData.profile && slackUserData.profile.real_name
      ? slackUserData.profile.real_name
      : "";

  const avatar =
    slackUserData && slackUserData.profile && slackUserData.profile.image_192
      ? slackUserData.profile.image_192
      : "";

  const handleNavigationSectionChange = (section) => {
    if (section === NAVIGATION_SECTION.PROFILE_SIDEBAR) {
      setProfileSideBarAnchorEl(true);
    } else {
      dispatch(setSelectedNavSectionAction(section));
    }
  };

  const handleProfileSidebarClose = () => {
    setProfileSideBarAnchorEl(null);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <NavBar
          selectedSection={selectedNavSection}
          setSelectedSection={handleNavigationSectionChange}
          userName={userName}
        />
      ) : null}

      {localStorage.getItem(CHEERSLY_TOKEN) && !isLoggedIn ? (
        <div className="loader-container">
          <Spinner />
        </div>
      ) : (
        <div>
          <Drawer
            open={Boolean(profileSideBarAnchorEl)}
            anchor="right"
            onClose={handleProfileSidebarClose}
          >
            <ProfileSideBar
              handleClose={handleProfileSidebarClose}
              userName={userName}
              avatar={avatar}
              cheersGiven={cheersGiven}
              cheersReceived={cheersReceived}
              cheersRedeemable={cheersRedeemable}
              role={role}
            />
          </Drawer>

          <Switch>
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/auth" component={AuthContainer} />

            <ProtectedRoute
              exact
              path="/account"
              isLoggedIn={isLoggedIn}
              component={AccountContainer}
            />

            <ProtectedRoute
              exact
              path="/admin-settings"
              isLoggedIn={isLoggedIn}
              component={AdminSettingsContainer}
            />

            {/* <ProtectedRoute
              exact
              path="/account/subscription"
              isLoggedIn={isLoggedIn}
              component={SubscriptionContainer}
            /> */}

            <ProtectedRoute
              exact
              path="/leaderboard"
              isLoggedIn={isLoggedIn}
              component={LeaderboardContainer}
            />

            <ProtectedRoute
              exact
              path="/company-values"
              isLoggedIn={isLoggedIn}
              render={(props) => (
                <CompanyValuesContainer {...props} role={role} />
              )}
            />

            <ProtectedRoute
              exact
              path="/rewards"
              isLoggedIn={isLoggedIn}
              render={(props) => <RewardsContainer {...props} role={role} />}
            />

            <ProtectedRoute
              exact
              path="/match-moments"
              isLoggedIn={isLoggedIn}
              render={(props) => (
                <MatchMomentsContainer {...props} role={role} />
              )}
            />

            {/*                          
        <ProtectedRoute
          path="/account/profile"
          isLoggedIn={isLoggedIn}
          component={ProfileContainer}
        /> */}

            {/* <ProtectedRoute
          path="/account/settings"
          isLoggedIn={isLoggedIn}
          component={SettingsContainer}
        /> */}

            {/* <ProtectedRoute
          path="/trial-expired"
          isLoggedIn={isTokenValid}
          component={TrialExpiredContainer}
        />

        <ProtectedRoute
          path="/subscription-expired"
          isLoggedIn={isTokenValid}
          component={SubscriptionExpiredContainer}
        /> */}

            <Redirect from="/" exact to="/login" />

            <Route
              exact
              path="*"
              render={(props) => <PageNotFound {...props} />}
            />
          </Switch>
        </div>
      )}
    </Router>
  );
};

export default RoutesContainer;
