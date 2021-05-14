import axios from "axios";
import {
  CHEERSLY_API_BASE_URL_V1,
  CHEERSLY_GRAPHQL_BASE_URL,
  SLACK_API,
} from "../utils/config";
import { getDefaultHeaders } from "../utils/common";
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

export const authorizeSlack = async (details) => {
  try {
    let formBody = [];
    // eslint-disable-next-line
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join("&");

    const req = await fetch(`${SLACK_API}/oauth.v2.access`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const res = await req.json();
    return res;
  } catch (error) {
    return error;
  }
};

export const validateToken = async () => {
  try {
    const headers = getDefaultHeaders();

    const response = await axios.post(
      `${CHEERSLY_API_BASE_URL_V1}/auth/validate-token`,
      {},
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// Leaderboard Start

export const getLeaderBoardList = async ({
  pageIndex,
  pageSize,
  type,
  duration,
}) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: LeaderBoardList,
      variables: { pageIndex, pageSize, type, duration },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Leaderboard End

// Cheers Stats Start

export const getCheersStat = async () => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: CheersStat,
      variables: {},
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Cheers Stats End

// Company Values Start

export const getCompanyValuesList = async () => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: CompanyValuesList,
      variables: {},
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCompanyValues = async ({ title, description }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: CreateCompanyValues,
      variables: { title, description },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCompanyValues = async ({ id, title, description }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: UpdateCompanyValues,
      variables: { id, title, description },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCompanyValues = async ({ id }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: DeleteCompanyValues,
      variables: { id },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Company Values End

// Admin Settings Start

export const getAdminSettingsList = async ({ pageIndex, pageSize }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: AdminSettingsList,
      variables: { pageIndex, pageSize },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminSwitch = async ({ userId, isAdmin }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: AdminSwitch,
      variables: { userId, isAdmin },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Admin Settings End

// Rewards Start

export const getRewardList = async () => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: RewardList,
      variables: {},
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createReward = async ({ title, description, price }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: CreateReward,
      variables: { title, description, price },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateReward = async ({ id, title, description, price }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: UpdateReward,
      variables: { id, title, description, price },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteReward = async ({ id }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: DeleteReward,
      variables: { id },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Rewards End

// Redemption Requests Start

export const getRedemptionRequestList = async ({ pageIndex, pageSize }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: RedemptionRequestsList,
      variables: { pageIndex, pageSize },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createRedemptionRequest = async ({ userId, rewardId }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: CreateRedemptionRequest,
      variables: { userId, rewardId },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const settleRedemptionRequest = async ({ id }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: SettleRedemptionRequest,
      variables: { id },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const declineRedemptionRequest = async ({ id }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: DeclineRedemptionRequest,
      variables: { id },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Redemption Requests End

// Rewards History Start

export const getRewardsHistoryList = async ({ pageIndex, pageSize }) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: RewardsHistoryList,
      variables: { pageIndex, pageSize },
    };

    const response = await axios.post(CHEERSLY_GRAPHQL_BASE_URL, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Rewards History Start
