import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import ViewListIcon from "@mui/icons-material/ViewList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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

    if (section === NAVIGATION_SECTION.LEADERBOARD) {
      history.push(NAVIGATION_ROUTES.LEADERBOARD);
    }

    if (section === NAVIGATION_SECTION.COMPANY_VALUES) {
      history.push(NAVIGATION_ROUTES.COMPANY_VALUES);
    }

    if (section === NAVIGATION_SECTION.REWARDS) {
      history.push(NAVIGATION_ROUTES.REWARDS);
    }

    if (section === NAVIGATION_SECTION.PROFILE_SIDEBAR) {
      //
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo-text">Cheersly</div>

      <div className="nav-actions-container">
        <div className="navbar-left-section">
          <div>
            {/* eslint-disable-next-line */}
            <Link
              underline="none"
              color="inherit"
              component="button"
              onClick={() => handleNavigation(NAVIGATION_SECTION.LEADERBOARD)}
            >
              <div
                className={
                  selectedSection === NAVIGATION_SECTION.LEADERBOARD
                    ? "nav-action navbar-selected-section"
                    : "nav-action"
                }
              >
                Leaderboard
              </div>
            </Link>
          </div>

          <div>
            {/* eslint-disable-next-line */}
            <Link
              underline="none"
              color="inherit"
              component="button"
              onClick={() =>
                handleNavigation(NAVIGATION_SECTION.COMPANY_VALUES)
              }
            >
              <div
                className={
                  selectedSection === NAVIGATION_SECTION.COMPANY_VALUES
                    ? "nav-action navbar-selected-section"
                    : "nav-action"
                }
              >
                Company Values
              </div>
            </Link>
          </div>

          <div>
            {/* eslint-disable-next-line */}
            <Link
              underline="none"
              color="inherit"
              component="button"
              onClick={() => handleNavigation(NAVIGATION_SECTION.REWARDS)}
            >
              <div
                className={
                  selectedSection === NAVIGATION_SECTION.REWARDS
                    ? "nav-action navbar-selected-section"
                    : "nav-action"
                }
              >
                Rewards
              </div>
            </Link>
          </div>
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
