import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageAssets from "../../../assets/images";
import { CHEERSLY_SUPPORT_EMAIL } from "../../../utils/constants";
import { SLACK_APP_AUTH_URL } from "../../../utils/config";
import "./styles.css";

const LoginContainer = () => {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    history.push("/dashboard");
  }

  return (
    <div className="login-container">
      <img src={ImageAssets.Logo} alt="Logo" className="logo-container" />

      <div className="login-header-text">
        Please sign in with your Slack account to access your team&apos;s
        Cheersly app dashboard!
      </div>

      <a href={SLACK_APP_AUTH_URL}>
        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
      </a>

      <div className="login-footer-text">
        Having trouble signing in? Contact{" "}
        <a href={`mailto:${CHEERSLY_SUPPORT_EMAIL}`}>
          {CHEERSLY_SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
};

export default LoginContainer;
