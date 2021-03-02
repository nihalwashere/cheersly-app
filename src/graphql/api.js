import axios from "axios";
import {
  CHEERSLY_API_BASE_URL_V1,
  CHEERSLY_GRAPHQL_BASE_URL,
  SLACK_API,
} from "../utils/config";
import { getDefaultHeaders } from "../utils/common";
import { getLeaderBoardListQuery, getCheersStatQuery } from "./queries";

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

export const getLeaderBoardList = async ({
  pageIndex,
  pageSize,
  type,
  duration,
}) => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: getLeaderBoardListQuery,
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

export const getCheersStat = async () => {
  try {
    const headers = getDefaultHeaders();

    const data = {
      query: getCheersStatQuery,
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
