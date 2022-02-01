import axios from "axios";

import {
  // Leaderboard
  LeaderBoardList,

  // Cheers Stats
  CheersStat,

  // Company Values
  CompanyValuesList,

  // Admin Settings
  AdminSettingsList,

  // Rewards
  RewardList,

  // Redemption Requests
  RedemptionRequestsList,

  // Rewards History
  RewardsHistoryList,
} from "./queries";
import {
  // Company Values
  CreateCompanyValues,
  UpdateCompanyValues,
  DeleteCompanyValues,

  // Admin Settings
  AdminSwitch,

  // Rewards
  CreateReward,
  UpdateReward,
  DeleteReward,

  // Redemption Requests
  CreateRedemptionRequest,
  SettleRedemptionRequest,
  DeclineRedemptionRequest,
} from "./mutations";
import { CHEERSLY_TOKEN } from "../utils/constants";

const getHeaders = () => ({
  "x-access-token": localStorage.getItem(CHEERSLY_TOKEN) || "",
});

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: getHeaders(),
});

const GRAPHQL = axios.create({
  baseURL: process.env.REACT_APP_GRAPHQL_BASE_URL,
  timeout: 5000,
  headers: getHeaders(),
});

// COMMON

type Error = any;

const processError = (error: Error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    return error.response;
  }

  if (error.request) {
    // client never received a response, or request never left

    return {
      success: false,
      message: "It's not you, it's us, want to give it another try?",
    };
  }

  // anything else

  return {
    success: false,
    message: "Oops! Something went wrong.",
  };
};

export const authorizeSlack = async (details: any) => {
  try {
    let formBody: any = [];

    // eslint-disable-next-line
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    formBody = formBody.join("&");

    const req = await fetch(`${process.env.SLACK_API}/oauth.v2.access`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const res = await req.json();
    return res;
  } catch (error) {
    return processError(error);
  }
};

export const signup = async (payload: { code: string }) => {
  try {
    return await API.post("/auth/signup", payload);
  } catch (error) {
    return processError(error);
  }
};

export const login = async (payload: { code: string }) => {
  try {
    return await API.post("/auth/login", payload);
  } catch (error) {
    return processError(error);
  }
};

export const validate = async () => {
  try {
    return await API.post("/auth/validate", {});
  } catch (error) {
    return processError(error);
  }
};

// Leaderboard Start

export const getLeaderBoardList = async ({
  pageIndex,
  pageSize,
  type,
  duration,
}: {
  pageIndex: number;
  pageSize: number;
  type: string;
  duration: string;
}) => {
  try {
    return await GRAPHQL.post("/", {
      query: LeaderBoardList,
      variables: { pageIndex, pageSize, type, duration },
    });
  } catch (error) {
    return processError(error);
  }
};

// Leaderboard End

// Cheers Stats Start

export const getCheersStat = async () => {
  try {
    return await GRAPHQL.post("/", {
      query: CheersStat,
      variables: {},
    });
  } catch (error) {
    return processError(error);
  }
};

// Cheers Stats End

// Company Values Start

export const getCompanyValuesList = async () => {
  try {
    return await GRAPHQL.post("/", {
      query: CompanyValuesList,
      variables: {},
    });
  } catch (error) {
    return processError(error);
  }
};

export const createCompanyValues = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  try {
    return await GRAPHQL.post("/", {
      query: CreateCompanyValues,
      variables: { title, description },
    });
  } catch (error) {
    return processError(error);
  }
};

export const updateCompanyValues = async ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  try {
    return await GRAPHQL.post("/", {
      query: UpdateCompanyValues,
      variables: { id, title, description },
    });
  } catch (error) {
    return processError(error);
  }
};

export const deleteCompanyValues = async ({ id }: { id: number }) => {
  try {
    return await GRAPHQL.post("/", {
      query: DeleteCompanyValues,
      variables: { id },
    });
  } catch (error) {
    return processError(error);
  }
};

// Company Values End

// Admin Settings Start

export const getAdminSettingsList = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    return await axios.post("/", {
      query: AdminSettingsList,
      variables: { pageIndex, pageSize },
    });
  } catch (error) {
    return processError(error);
  }
};

export const adminSwitch = async ({
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
}) => {
  try {
    return await axios.post("/", {
      query: AdminSwitch,
      variables: { userId, isAdmin },
    });
  } catch (error) {
    return processError(error);
  }
};

// Admin Settings End

// Rewards Start

export const getRewardList = async () => {
  try {
    return await axios.post("/", {
      query: RewardList,
      variables: {},
    });
  } catch (error) {
    return processError(error);
  }
};

export const createReward = async ({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: number;
}) => {
  try {
    return await axios.post("/", {
      query: CreateReward,
      variables: { title, description, price },
    });
  } catch (error) {
    return processError(error);
  }
};

export const updateReward = async ({
  id,
  title,
  description,
  price,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
}) => {
  try {
    return await axios.post("/", {
      query: UpdateReward,
      variables: { id, title, description, price },
    });
  } catch (error) {
    return processError(error);
  }
};

export const deleteReward = async ({ id }: { id: number }) => {
  try {
    return await axios.post("/", {
      query: DeleteReward,
      variables: { id },
    });
  } catch (error) {
    return processError(error);
  }
};

// Rewards End

// Redemption Requests Start

export const getRedemptionRequestList = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    return await axios.post("/", {
      query: RedemptionRequestsList,
      variables: { pageIndex, pageSize },
    });
  } catch (error) {
    return processError(error);
  }
};

export const createRedemptionRequest = async ({
  userId,
  rewardId,
}: {
  userId: number;
  rewardId: number;
}) => {
  try {
    return await axios.post("/", {
      query: CreateRedemptionRequest,
      variables: { userId, rewardId },
    });
  } catch (error) {
    return processError(error);
  }
};

export const settleRedemptionRequest = async ({ id }: { id: number }) => {
  try {
    return await axios.post("/", {
      query: SettleRedemptionRequest,
      variables: { id },
    });
  } catch (error) {
    return processError(error);
  }
};

export const declineRedemptionRequest = async ({ id }: { id: number }) => {
  try {
    return await axios.post("/", {
      query: DeclineRedemptionRequest,
      variables: { id },
    });
  } catch (error) {
    return processError(error);
  }
};

// Redemption Requests End

// Rewards History Start

export const getRewardsHistoryList = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    return await axios.post("/", {
      query: RewardsHistoryList,
      variables: { pageIndex, pageSize },
    });
  } catch (error) {
    return processError(error);
  }
};

// Rewards History End
