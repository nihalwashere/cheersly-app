import axios from "axios";

import { CHEERSLY_TOKEN } from "../utils/constants";

const getHeaders = () => ({
  "x-access-token": localStorage.getItem(CHEERSLY_TOKEN) || "",
});

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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
    const response = await API.post("/auth/validate", {});
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// USERS

export const getAllUsers = async (params: any) => {
  try {
    const response = await API.get("/users/all", { params });
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

/* ********* RECOGNITION ********** */

// TEAMS

export const getAllTeams = async () => {
  try {
    const response = await API.get("/recognition/teams");
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const getTeamDetails = async (id: string) => {
  try {
    const response = await API.get(`/recognition/teams/${id}`);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createTeam = async (payload: any) => {
  try {
    const response = await API.post("/recognition/teams", payload);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateTeam = async (id: string, payload: any) => {
  try {
    const response = await API.put(`/recognition/teams/${id}`, payload);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteTeam = async (id: string) => {
  try {
    const response = await API.delete(`/users/teams/${id}`);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// COMPANY VALUES

export const getCompanyValues = async () => {
  try {
    const response = await API.get("/recognition/company-values");
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const createCompanyValues = async (payload: any) => {
  try {
    const response = await API.post("/recognition/company-values", payload);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const updateCompanyValues = async (id: string, payload: any) => {
  try {
    const response = await API.put(
      `/recognition/company-values/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

export const deleteCompanyValues = async (id: string) => {
  try {
    const response = await API.delete(`/recognition/company-values/${id}`);
    return response.data;
  } catch (error) {
    return processError(error);
  }
};

// SLACK CHANNELS

export const getSlackChannels = async () => {
  try {
    const response = await API.get("/slack/channels");
    return response.data;
  } catch (error) {
    return processError(error);
  }
};
