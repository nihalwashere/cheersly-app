import ImageAssets from "../assets/images";
// import { ACCOUNT_SECTIONS } from "./accountSections";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
import { USER_ROLE } from "./userRoles";

export const profileSideBarNavigationTabs = [
  // {
  //   icon: ImageAssets.Account_Icon,
  //   text: "Account",
  //   route: NAVIGATION_ROUTES.ACCOUNT,
  //   section: ACCOUNT_SECTIONS.PROFILE,
  //   shouldRenderRightArrowIcon: true,
  // },
  // {
  //   icon: Billing_Icon,
  //   text: "Billing",
  //   route: NAVIGATION_ROUTES.ACCOUNT,
  //   section: ACCOUNT_SECTIONS.BILLING,
  //   shouldRenderRightArrowIcon: true,
  // },
  // {
  //   icon: Pricing_Icon,
  //   text: "Pricing",
  //   route: NAVIGATION_ROUTES.ACCOUNT,
  //   section: ACCOUNT_SECTIONS.PRICING,
  //   shouldRenderRightArrowIcon: true,
  // },
  // {
  //   icon: Help_Icon,
  //   text: "Help",
  //   route: NAVIGATION_ROUTES.ACCOUNT,
  //   section: ACCOUNT_SECTIONS.HELP,
  //   shouldRenderRightArrowIcon: true,
  // },
  {
    id: 1,
    icon: ImageAssets.Account_Icon,
    text: "Admin Settings",
    route: NAVIGATION_ROUTES.ADMIN_SETTINGS,
    section: null,
    shouldRenderRightArrowIcon: true,
    admittedRole: USER_ROLE.ADMIN,
  },
  {
    id: 2,
    icon: ImageAssets.Logout_Icon,
    text: "Logout",
    route: null, // handle logout with saga
    section: null,
    shouldRenderRightArrowIcon: false,
  },
];
