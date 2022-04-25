import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "../Button";
import SelectCountryDialog from "../SelectCountryDialog";
import { useMergeState } from "../../utils/custom-hooks";
import { NAVS } from "../../utils/constants";
import { logoutSaga } from "../../containers/auth/state/actions";
import { updateCountryForUserSaga } from "../../containers/users/state/actions"; // user actions
import ImageAssets from "../../assets/images";
import { USER_ROLE } from "../../enums/userRoles";

export default function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { user } = useSelector((state: any) => state.auth);

  const { teamPointBalance, userPointBalance } = useSelector(
    (state: any) => state.global
  );

  const [state, setState] = useMergeState({
    navs: NAVS.TOP_NAVS.filter((nav) => nav.shouldShow),
    selectedNav: NAVS.TOP_NAVS[0],
    selectedInnerNav: NAVS.TOP_NAVS[0].innerNavs[0],
    profileMenuAnchorEl: null,
    shouldShowSelectCountryDialog: false,
  });

  const handleNavChange = (nav: any) => {
    setState({ selectedNav: nav, selectedInnerNav: nav.innerNavs[0] });

    if (nav.innerNavs[0]) {
      navigate(`${nav.route}${nav.innerNavs[0].route}`);
    } else {
      navigate(`${nav.route}`);
    }
  };

  const handleInnerNavChange = (innerNav: any) => {
    setState({ selectedInnerNav: innerNav });
    navigate(`${state.selectedNav.route}${innerNav.route}`);
  };

  const handleOpenProfileMenu = (event: any) => {
    setState({ profileMenuAnchorEl: event.currentTarget });
  };

  const handleCloseProfileMenu = () => {
    setState({ profileMenuAnchorEl: null });
  };

  const handleLogout = () => {
    handleCloseProfileMenu();
    dispatch(logoutSaga());
  };

  const handleRedeemRedirect = () => {
    navigate("/redeem");
  };

  const handleOpenSelectCountryDialog = () => {
    setState({ shouldShowSelectCountryDialog: true });
    handleCloseProfileMenu();
  };

  const handleCloseShouldShowSelectCountryDialog = () => {
    setState({ shouldShowSelectCountryDialog: false });
  };

  const handleSaveCountry = (payload: any) => {
    dispatch(updateCountryForUserSaga(payload));
    handleCloseShouldShowSelectCountryDialog();
  };

  useEffect(() => {
    if (user?.role && user?.role === USER_ROLE.MEMBER) {
      // members can only access gift cards
      setState({ navs: [] });
      navigate("/redeem");
    }
  }, [user]);

  useEffect(() => {
    const mainNav = pathname.split("/")[1];
    const nestedNav = pathname.split("/")[2];

    const topNav = NAVS.TOP_NAVS.find((elem) => elem.route === `/${mainNav}`);

    if (topNav?.route) {
      setState({ selectedNav: topNav });

      if (nestedNav) {
        const innerNav = topNav?.innerNavs.find(
          (elem) => elem.route === `/${nestedNav}`
        );

        if (innerNav?.route) {
          setState({ selectedInnerNav: innerNav });
        }
      }
    }
  }, [pathname]);

  return (
    <div className="w-1/4 flex">
      <div className="w-20 h-screen border-r border-gray-200 flex flex-col justify-between">
        <div>
          <img src={ImageAssets.Logo} alt="" />
        </div>

        <div className="flex flex-col items-center">
          {state.navs.map((nav: any) => (
            <div
              key={nav.id}
              className={`w-full h-full flex justify-center mb-4  ${
                state.selectedNav?.id === nav.id
                  ? "bg-gray-200 border-r-2 border-primary"
                  : ""
              }`}
            >
              <Tooltip title={nav.title} placement="right">
                {nav?.iconComponent && (
                  <IconButton onClick={() => handleNavChange(nav)}>
                    <nav.iconComponent />
                  </IconButton>
                )}
              </Tooltip>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <IconButton onClick={handleOpenProfileMenu} size="small">
            <Avatar alt={user?.profile?.realName} src={user?.profile?.avatar} />
          </IconButton>

          <Menu
            anchorEl={state.profileMenuAnchorEl}
            open={Boolean(state.profileMenuAnchorEl)}
            onClose={handleCloseProfileMenu}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <MenuItem disabled>{user?.profile?.realName}</MenuItem>

            <MenuItem disabled>Country: {user?.country || "None"}</MenuItem>

            <MenuItem onClick={handleOpenSelectCountryDialog}>
              Select country
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="w-full h-screen border-r border-gray-200 flex flex-col justify-between items-center">
        <div className="pt-4 w-5/6">
          <div className="flex text-2xl font-semibold">
            {state.selectedNav?.title}
          </div>

          <div className="mt-8 flex flex-col">
            {state.selectedNav?.innerNavs.map((innerNav: any) => (
              <div
                key={innerNav.id}
                className={`w-full h-full flex mb-4 text-gray-500 ${
                  state.selectedInnerNav?.id === innerNav.id
                    ? "text-gray-900 font-semibold"
                    : ""
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleInnerNavChange(innerNav)}
                >
                  {innerNav.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col items-center rounded-md p-2 border-2 bg-slate-100">
            <span className="text-xs text-gray-500">
              Your team&apos;s balance
            </span>
            <span className="font-semibold">{teamPointBalance} points</span>
          </div>

          <div className="flex flex-col items-center rounded-md p-2 border-2 bg-slate-100 mt-4">
            <span className="text-xs text-gray-500">Your balance</span>
            <span className="font-semibold">{userPointBalance} points</span>
          </div>

          {user?.role === USER_ROLE.ADMIN && (
            <div className="mt-4 flex justify-center">
              <Button label="Redeem" onClick={handleRedeemRedirect} />
            </div>
          )}
        </div>
      </div>

      {state.shouldShowSelectCountryDialog && (
        <SelectCountryDialog
          selectedCountry={user?.country}
          open={state.shouldShowSelectCountryDialog}
          onClose={handleCloseShouldShowSelectCountryDialog}
          onSave={handleSaveCountry}
        />
      )}
    </div>
  );
}
