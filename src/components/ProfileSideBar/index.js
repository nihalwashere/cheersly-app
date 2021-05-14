import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ImageAssets from "../../assets/images";
import { profileSideBarNavigationTabs } from "../../enums/profileSideBarNavigationTabs";
import { logoutSagaAction } from "../../containers/auth/state/actions"; // auth actions
// import { setSelectedSectionForAccount } from "../../containers/account/state/actions"; // account actions
import { setSelectedNavSectionAction } from "../../containers/root/state/actions";
import { NAVIGATION_SECTION } from "../../enums/navigationRoutes";
import { ACCOUNT_SECTIONS } from "../../enums/accountSections";
import "./styles.css";
import { USER_ROLE } from "../../enums/userRoles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: "100%",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: "10px auto 19px auto",
    textAlign: "center",
  },
}));

const ProfileSideBar = (props) => {
  const {
    userName,
    handleClose,
    avatar,
    cheersGiven,
    cheersReceived,
    cheersRedeemable,
    role,
  } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const handleNavigation = (navigationItem) => {
    handleClose();

    const { route } = navigationItem;

    if (route) {
      dispatch(setSelectedNavSectionAction(NAVIGATION_SECTION.PROFILE_SIDEBAR));
      history.push(navigationItem.route);
    } else {
      dispatch(logoutSagaAction(history));
    }
  };

  return (
    <Paper className={classes.root}>
      <div className="profile-side-bar-top-container">
        <Avatar alt={userName} src={avatar} className={classes.large} />
        <div className="profile-side-bar-name-text">{userName}</div>

        <div className="profile-side-bar-stats-container">
          <div className="profile-side-bar-stat">
            <span>Cheers Given</span>
            <span className="profile-side-bar-stat-count">{cheersGiven}</span>
          </div>
          {/* <div className="profile-side-bar-center-bar" /> */}
          <div className="profile-side-bar-stat">
            <span>Cheers Received</span>
            <span className="profile-side-bar-stat-count">
              {cheersReceived}
            </span>
          </div>
        </div>

        <div className="profile-side-bar-cheers-redeemable-stat">
          <span>Cheers Redeemable</span>
          <span className="profile-side-bar-cheers-redeemable-stat-count">
            {cheersRedeemable}
          </span>
        </div>
      </div>

      <>
        {profileSideBarNavigationTabs.map((navigationItem) =>
          !navigationItem.admittedRole ? (
            <div key={navigationItem.id}>
              <div
                className="profile-side-bar-navigation-list-item"
                onClick={() => handleNavigation(navigationItem)}
              >
                <div className="profile-side-bar-navigation-list-item-img-text-container">
                  <img
                    src={navigationItem.icon}
                    alt="account"
                    className="profile-side-bar-navigation-list-item-img"
                  />

                  <span className="profile-side-bar-navigation-list-item-text">
                    {navigationItem.text}
                  </span>
                </div>

                {navigationItem.shouldRenderRightArrowIcon && (
                  <div className="profile-side-bar-navigation-list-right-arrow-img">
                    <img src={ImageAssets.Right_Arrow_Icon} alt="more" />
                  </div>
                )}
              </div>

              <Divider />
            </div>
          ) : navigationItem.admittedRole === USER_ROLE.ADMIN &&
            role === USER_ROLE.ADMIN ? (
            <div key={navigationItem.id}>
              <div
                className="profile-side-bar-navigation-list-item"
                onClick={() => handleNavigation(navigationItem)}
              >
                <div className="profile-side-bar-navigation-list-item-img-text-container">
                  <img
                    src={navigationItem.icon}
                    alt="account"
                    className="profile-side-bar-navigation-list-item-img"
                  />

                  <span className="profile-side-bar-navigation-list-item-text">
                    {navigationItem.text}
                  </span>
                </div>

                {navigationItem.shouldRenderRightArrowIcon && (
                  <div className="profile-side-bar-navigation-list-right-arrow-img">
                    <img src={ImageAssets.Right_Arrow_Icon} alt="more" />
                  </div>
                )}
              </div>

              <Divider />
            </div>
          ) : null
        )}
      </>
    </Paper>
  );
};

ProfileSideBar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  cheersGiven: PropTypes.number.isRequired,
  cheersReceived: PropTypes.number.isRequired,
  cheersRedeemable: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProfileSideBar;
