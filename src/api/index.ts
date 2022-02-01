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

// USERS

export const getAllUsers = async (params: any) => {
  try {
    return await API.get("/users/all", { params });
  } catch (error) {
    return processError(error);
  }
};

export const getAllTeams = async () => {
  try {
    return await API.get("/users/teams");
  } catch (error) {
    return processError(error);
  }
};

export const createTeam = async (payload: any) => {
  try {
    return await API.post("/users/teams", payload);
  } catch (error) {
    return processError(error);
  }
};

export const updateTeam = async (id: string, payload: any) => {
  try {
    return await API.put(`/users/teams/${id}`, payload);
  } catch (error) {
    return processError(error);
  }
};

export const deleteTeam = async (id: string) => {
  try {
    return await API.delete(`/users/teams/${id}`);
  } catch (error) {
    return processError(error);
  }
};
