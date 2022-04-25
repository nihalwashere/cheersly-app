import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";

export const CHEERSLY_TOKEN = "CHEERSLY_TOKEN";

export const CHEERSLY_SUPPORT_EMAIL = "support@cheersly.club";

export const MESSAGE_SEVERITY = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const DEFAULT_BASE_CURRENCY = "USD";

export const DEFAULT_BASE_POINT_VALUE = 0.01;

export const NAVS = {
  TOP_NAVS: [
    {
      id: 1,
      title: "Dashboard",
      iconComponent: DashboardIcon,
      route: "/dashboard",
      innerNavs: [
        {
          id: 1,
          title: "Getting Started",
          route: "/getting-started",
        },
        // {
        //   id: 2,
        //   title: "Overview",
        //   route: "/overview",
        // },
        {
          id: 3,
          title: "Activity",
          route: "/activity",
        },
      ],
      shouldShow: true,
    },
    {
      id: 2,
      title: "Recognition",
      iconComponent: CampaignIcon,
      route: "/recognition",
      innerNavs: [
        {
          id: 1,
          title: "Teams",
          route: "/teams",
        },
        {
          id: 2,
          title: "Company Values",
          route: "/company-values",
        },
      ],
      shouldShow: true,
    },
    // {
    //   id: 3,
    //   title: "Awards",
    //   iconComponent: EmojiEventsIcon,
    //   route: "/awards",
    //   innerNavs: [
    //     {
    //       id: 1,
    //       title: "Insights",
    //       route: "/insights",
    //     },
    //     {
    //       id: 2,
    //       title: "Settings",
    //       route: "/settings",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   title: "Rewards",
    //   iconComponent: CardGiftcardIcon,
    //   route: "/rewards",
    //   innerNavs: [
    //     {
    //       id: 1,
    //       title: "Insights",
    //       route: "/insights",
    //     },
    //     {
    //       id: 2,
    //       title: "Catalog",
    //       route: "/catalog",
    //     },
    //     {
    //       id: 3,
    //       title: "Settings",
    //       route: "/settings",
    //     },
    //   ],
    // },
    {
      id: 5,
      title: "Users",
      iconComponent: PeopleAltIcon,
      route: "/users",
      innerNavs: [],
      shouldShow: true,
    },
    {
      id: 6,
      title: "Billing",
      iconComponent: AttachMoneyIcon,
      route: "/billing",
      innerNavs: [
        {
          id: 1,
          title: "Rewards",
          route: "/rewards",
        },
        // {
        //   id: 2,
        //   title: "Subscription",
        //   route: "/subscription",
        // },
        // {
        //   id: 3,
        //   title: "Invoices",
        //   route: "/invoices",
        // },
      ],
      shouldShow: true,
    },
    {
      id: 7,
      title: "Settings",
      iconComponent: SettingsIcon,
      route: "/settings",
      innerNavs: [],
      shouldShow: true,
    },
    {
      id: 8,
      title: "Redeem",
      iconComponent: null,
      route: "/redeem",
      innerNavs: [],
      shouldShow: false,
    },
  ],
};

export const VALUE_TYPE = {
  FIXED_VALUE: "FIXED_VALUE",
  VARIABLE_VALUE: "VARIABLE_VALUE",
};
