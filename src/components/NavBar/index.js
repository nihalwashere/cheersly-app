import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import ViewListIcon from "@material-ui/icons/ViewList";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  NAVIGATION_ROUTES,
  NAVIGATION_SECTION,
} from "../../enums/navigationRoutes";
import "./styles.css";

const NavBar = (props) => {
  const history = useHistory();

  const { selectedSection, setSelectedSection, userName } = props;

  const handleNavigation = (section) => {
    setSelectedSection(section);

    if (section === NAVIGATION_SECTION.DASHBOARD) {
      history.push(NAVIGATION_ROUTES.DASHBOARD);
    }

    if (section === NAVIGATION_SECTION.PROFILE_SIDEBAR) {
      //
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo-text">Cheersly</div>

      <div className="nav-actions-container">
        <div>
          {/* eslint-disable-next-line */}
          <Link
            underline="none"
            color="inherit"
            component="button"
            onClick={() => handleNavigation(NAVIGATION_SECTION.DASHBOARD)}
          >
            <div
              className={
                selectedSection === NAVIGATION_SECTION.DASHBOARD
                  ? "nav-action navbar-selected-section"
                  : "nav-action"
              }
            >
              Leaderboard
            </div>
          </Link>
        </div>

        <div className="navbar-right-section">
          <div className="navbar-user-name">Hi, {userName}</div>

          <div className="nav-action-toggle-button-container">
            <ToggleButtonGroup
              orientation="vertical"
              value="list"
              exclusive
              onChange={() =>
                handleNavigation(NAVIGATION_SECTION.PROFILE_SIDEBAR)
              }
            >
              <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  selectedSection: PropTypes.string.isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default NavBar;
