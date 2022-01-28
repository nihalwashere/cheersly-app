import React from "react";
import { CHEERSLY_SUPPORT_EMAIL } from "../../../utils/constants";

export default function SignUp() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="text-4xl font-semibold mb-12">cheersly</div>

        <div className="text-2xl font-medium">Hey there!</div>

        <div className="text-xl font-normal mt-2">
          Let&apos;s setup Cheersly for your team.
        </div>

        <div className="mt-10 flex justify-center">
          <a href={process.env.REACT_APP_SLACK_OAUTH_URL}>
            <img
              alt="Sign in with Slack"
              height="40"
              width="172"
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
            />
          </a>
        </div>

        <div className="mt-10">
          Having trouble signing in? Contact{" "}
          <a href={`mailto:${CHEERSLY_SUPPORT_EMAIL}`} className="underline">
            {CHEERSLY_SUPPORT_EMAIL}
          </a>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        {/* <img src={ImageAssets} alt="" /> */}
        Some image here
      </div>
    </div>
  );
}
