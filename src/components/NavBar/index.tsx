import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMergeState } from "../../utils/custom-hooks";
import { NAVS } from "../../utils/constants";
import { logoutSaga } from "../../containers/auth/state/actions";
import ImageAssets from "../../assets/images";

export default function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [state, setState] = useMergeState({
    selectedNav: NAVS.TOP_NAVS[0],
    selectedInnerNav: NAVS.TOP_NAVS[0].innerNavs[0],
    topNavs: NAVS.TOP_NAVS,
    bottomNavs: NAVS.BOTTOM_NAVS,
    profileMenuAnchorEl: null,
  });

  const handleNavChange = (nav: any) => {
    setState({ selectedNav: nav, selectedInnerNav: nav.innerNavs[0] });
    navigate(`${nav.route}${nav.innerNavs[0].route}`);
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
    dispatch(logoutSaga(navigate));
  };

  return (
    <div className="w-1/5 flex">
      <div className="w-20 h-screen border-r border-gray-200 flex flex-col justify-between">
        <div>
          <img src={ImageAssets.Logo} alt="" />
        </div>

        <div className="flex flex-col items-center">
          {state.topNavs.map((nav: any) => (
            <div
              key={nav.id}
              className={`w-full h-full flex justify-center mb-4  ${
                state.selectedNav?.id === nav.id
                  ? "bg-gray-200 border-r-2 border-primary"
                  : ""
              }`}
            >
              <Tooltip title={nav.title} placement="right">
                <IconButton onClick={() => handleNavChange(nav)}>
                  <nav.iconComponent />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <IconButton onClick={handleOpenProfileMenu} size="small">
            <Avatar>A</Avatar>
          </IconButton>

          <Menu
            anchorEl={state.profileMenuAnchorEl}
            open={Boolean(state.profileMenuAnchorEl)}
            onClose={handleCloseProfileMenu}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <MenuItem disabled>Admin</MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="w-full h-screen border-r border-gray-200 flex flex-col">
        <div className="pt-4 pl-8">
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
      </div>
    </div>
  );
}
