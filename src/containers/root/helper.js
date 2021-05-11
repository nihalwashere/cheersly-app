import {
  NAVIGATION_SECTION,
  NAVIGATION_ROUTES,
} from "../../enums/navigationRoutes";

export const resolveRoute = (path) => {
  const mapper = {
    [NAVIGATION_ROUTES.DASHBOARD]: () => NAVIGATION_SECTION.DASHBOARD,
    [NAVIGATION_ROUTES.LEADERBOARD]: () => NAVIGATION_SECTION.LEADERBOARD,
    [NAVIGATION_ROUTES.COMPANY_VALUES]: () => NAVIGATION_SECTION.COMPANY_VALUES,
  };

  const applyMapper = mapper[path];

  return applyMapper ? applyMapper() : "";
};

export const shouldRenderNav = (selectedNavSection) =>
  [
    NAVIGATION_SECTION.DASHBOARD,
    NAVIGATION_SECTION.LEADERBOARD,
    NAVIGATION_SECTION.COMPANY_VALUES,
    NAVIGATION_SECTION.PROFILE_SIDEBAR,
  ].includes(selectedNavSection);
