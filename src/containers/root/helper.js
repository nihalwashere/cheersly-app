import {
  NAVIGATION_SECTION,
  NAVIGATION_ROUTES,
} from "../../enums/navigationRoutes";

export const resolveRoute = (path) => {
  const mapper = {
    [NAVIGATION_ROUTES.DASHBOARD]: () => NAVIGATION_SECTION.DASHBOARD,
  };

  const applyMapper = mapper[path];

  return applyMapper ? applyMapper() : "";
};

export const shouldRenderNav = (selectedNavSection) =>
  [NAVIGATION_SECTION.DASHBOARD, NAVIGATION_SECTION.PROFILE_SIDEBAR].includes(
    selectedNavSection
  );
