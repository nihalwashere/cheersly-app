export const CHEERSLY_API_BASE_URL_V1 =
  "https://cheersly-dev.herokuapp.com/api/v1"; // dev

export const SLACK_CLIENT_ID = "1292560080950.1764108002000"; // dev

export const SLACK_CLIENT_SECRET = "ecd30e96dcd31b871ee7c6c3fbbb8618"; // dev

export const SLACK_REDIRECT_URI = "https://app-dev.cheersly.club/auth"; // dev

export const SLACK_APP_AUTH_URL = `https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_REDIRECT_URI}`;
