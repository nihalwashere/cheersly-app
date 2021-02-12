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
  const { userName, handleClose, avatar } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const handleNavigation = (navigationItem) => {
    handleClose();

    const { section } = navigationItem;

    if (navigationItem.route && section) {
      // dispatch(setSelectedSectionForAccount(section)); // set account section

      if (section === ACCOUNT_SECTIONS.HELP) {
        dispatch(setSelectedNavSectionAction(NAVIGATION_SECTION.HELP));
      } else {
        dispatch(
          setSelectedNavSectionAction(NAVIGATION_SECTION.PROFILE_SIDEBAR)
        );
      }

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
      </div>

      <>
        {profileSideBarNavigationTabs.map((navigationItem) => (
          <div>
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
        ))}
      </>
    </Paper>
  );
};

ProfileSideBar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

export default ProfileSideBar;
