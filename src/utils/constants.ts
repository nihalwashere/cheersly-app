import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
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
          title: "Overview",
          route: "/overview",
        },
        {
          id: 2,
          title: "Insights",
          route: "/insights",
        },
        {
          id: 3,
          title: "Activity",
          route: "/activity",
        },
      ],
    },
    {
      id: 2,
      title: "Recognition",
      iconComponent: CampaignIcon,
      route: "/recognition",
      innerNavs: [
        {
          id: 1,
          title: "Channels",
          route: "/channels",
        },
        {
          id: 2,
          title: "Settings",
          route: "/settings",
        },
      ],
    },
    {
      id: 3,
      title: "Awards",
      iconComponent: EmojiEventsIcon,
      route: "/awards",
      innerNavs: [
        {
          id: 1,
          title: "Insights",
          route: "/insights",
        },
        {
          id: 2,
          title: "Settings",
          route: "/settings",
        },
      ],
    },
    {
      id: 4,
      title: "Rewards",
      iconComponent: CardGiftcardIcon,
      route: "/rewards",
      innerNavs: [
        {
          id: 1,
          title: "Insights",
          route: "/insights",
        },
        {
          id: 2,
          title: "Catalog",
          route: "/catalog",
        },
        {
          id: 3,
          title: "Settings",
          route: "/settings",
        },
      ],
    },
    {
      id: 5,
      title: "Billing",
      iconComponent: AttachMoneyIcon,
      route: "/billing",
      innerNavs: [
        {
          id: 1,
          title: "Rewards",
          route: "/rewards",
        },
        {
          id: 2,
          title: "Subscription",
          route: "/subscription",
        },
        {
          id: 3,
          title: "Invoices",
          route: "/invoices",
        },
      ],
    },
    {
      id: 6,
      title: "Users",
      iconComponent: PeopleAltIcon,
      route: "/users",
      innerNavs: [
        {
          id: 1,
          title: "All Users",
          route: "/all",
        },
        {
          id: 2,
          title: "Teams",
          route: "/team",
        },
      ],
    },
  ],
  BOTTOM_NAVS: [
    {
      id: 7,
      title: "Settings",
      iconComponent: SettingsIcon,
      route: "/settings",
      innerNavs: [
        {
          id: 1,
          title: "Team Settings",
          route: "/team",
        },
      ],
    },
  ],
};
