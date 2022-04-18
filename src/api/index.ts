import axios from "axios";

import { CHEERSLY_TOKEN } from "../utils/constants";

const getHeaders = () => ({
  "x-access-token": localStorage.getItem(CHEERSLY_TOKEN) || "",
});

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
});

// COMMON

type Error = any;

const processError = (error: Error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    return error.response.data;
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

// AUTH

export const signup = async (payload: { code: string }) => {
  try {
    const response = await API.post("/auth/signup", payload);
    return response;
  } catch (error) {
    return processError(error);
  }
};

export const login = async (payload: { code: string }) => {
  try {
    const response = await API.post("/auth/login", payload);
    return response;
  } catch (error) {
    return processError(error);
  }
};

export const validate = async () => {
  try {
    const response = await API.post(
      "/auth/validate",
      {},
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// USER

export const getAllUsers = async (params: any) => {
  try {
    const response = await API.get("/user/all", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getAllUsersStats = async (params: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const response = await API.get("/user/all/stats", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateUserCountry = async (payload: any) => {
  try {
    const response = await API.put("/user/country", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getUserPointBalance = async () => {
  try {
    const response = await API.get("/user/balance", { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// TEAM

export const getTeam = async () => {
  try {
    const response = await API.get("/team", { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamActivity = async (params: {
  perPage: number;
  pageIndex: number;
}) => {
  try {
    const response = await API.get("/team/activity", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const enableApp = async (payload: any) => {
  try {
    const response = await API.post("/team/enable-app", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamSettings = async () => {
  try {
    const response = await API.get("/team/settings", { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateTeamSettings = async (payload: any) => {
  try {
    const response = await API.put("/team/settings", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamPointBalance = async () => {
  try {
    const response = await API.get("/team/balance", { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamRewardStats = async () => {
  try {
    const response = await API.get("/team/reward-stats", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamPointTopUps = async () => {
  try {
    const response = await API.get("/team/top-ups", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// RECOGNITION TEAMS

export const getAllTeams = async () => {
  try {
    const response = await API.get("/recognition/teams", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamDetails = async (id: string) => {
  try {
    const response = await API.get(`/recognition/teams/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createTeam = async (payload: any) => {
  try {
    const response = await API.post("/recognition/teams", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateTeam = async (id: string, payload: any) => {
  try {
    const response = await API.put(`/recognition/teams/${id}`, payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteTeam = async (id: string) => {
  try {
    const response = await API.delete(`/recognition/teams/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// RECOGNITION COMPANY VALUES

export const getCompanyValues = async () => {
  try {
    const response = await API.get("/recognition/company-values", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createCompanyValues = async (payload: any) => {
  try {
    const response = await API.post("/recognition/company-values", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateCompanyValues = async (id: string, payload: any) => {
  try {
    const response = await API.put(
      `/recognition/company-values/${id}`,
      payload,
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteCompanyValues = async (id: string) => {
  try {
    const response = await API.delete(`/recognition/company-values/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// SLACK CHANNELS

export const getSlackChannels = async () => {
  try {
    const response = await API.get("/slack/channels", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// GIFT CARDS

export const getCatalogs = async (params?: {
  brandKey?: string;
  country?: string;
}) => {
  try {
    const response = await API.get("/gift-cards/catalog", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const placeOrder = async (payload: any) => {
  try {
    const response = await API.post("/gift-cards/order", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getExchangeRate = async (params: {
  rewardCurrency: string;
  baseCurrency: string;
}) => {
  try {
    const response = await API.get("/gift-cards/exchange-rate", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// BILLING

export const createSetupIntent = async () => {
  try {
    const response = await API.post(
      "/billing/create-setup-intent",
      {},
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getPaymentMethods = async () => {
  try {
    const response = await API.get("/billing/payment-methods", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const addPaymentMethod = async (payload: {
  paymentMethodId: string;
}) => {
  try {
    const response = await API.post("/billing/payment-method", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createPaymentIntent = async (payload: {
  points: number;
  pointCost: number;
  platformFee: number;
  totalCost: number;
}) => {
  try {
    const response = await API.post("/billing/create-payment-intent", payload, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getPaymentIntent = async (params: { paymentIntentId: string }) => {
  try {
    const response = await API.get("/billing/get-payment-intent", {
      params,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
