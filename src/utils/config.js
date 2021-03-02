// -------------------- PRODUCTION ---------------------

// export const CHEERSLY_API_BASE_URL_V1 = "https://cheersly.herokuapp.com/api/v1"; // prod

// export const CHEERSLY_GRAPHQL_BASE_URL =
//   "https://cheersly.herokuapp.com/graphql"; // prod

// export const SLACK_CLIENT_ID = "965550414273.1557391535763"; // prod

// export const SLACK_CLIENT_SECRET = "42aab2130c372391452e5b925bf58cc8"; // prod

// export const SLACK_REDIRECT_URI = "https://app.cheersly.club/auth"; // prod

// -------------------- DEVELOP ------------------------

export const CHEERSLY_API_BASE_URL_V1 =
  "https://cheersly-dev.herokuapp.com/api/v1"; // dev

export const CHEERSLY_GRAPHQL_BASE_URL =
  "https://cheersly-dev.herokuapp.com/graphql"; // dev

export const SLACK_CLIENT_ID = "1292560080950.1764108002000"; // dev

export const SLACK_CLIENT_SECRET = "ecd30e96dcd31b871ee7c6c3fbbb8618"; // dev

export const SLACK_REDIRECT_URI = "https://app-dev.cheersly.club/auth"; // dev

// -------------------- LOCAL ------------------------

// export const CHEERSLY_API_BASE_URL_V1 = "http://localhost:7000/api/v1"; // local

// export const CHEERSLY_GRAPHQL_BASE_URL = "http://localhost:7000/graphql"; // local

// export const SLACK_REDIRECT_URI = "http://localhost:3000/auth"; // local

export const SLACK_APP_AUTH_URL = `https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_REDIRECT_URI}`;

// ------------------- COMMON -------------------

export const SLACK_API = "https://slack.com/api";
