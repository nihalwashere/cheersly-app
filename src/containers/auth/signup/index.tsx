import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function SignUp() {
  const [consentEmailChecked, setConsentEmailChecked] = useState(false);

  const [tosChecked, setTosChecked] = useState(false);

  const handleCheckConsentContactEmail = (event: any) => {
    setConsentEmailChecked(event.target.checked);
  };

  const handleCheckTOS = (event: any) => {
    setTosChecked(event.target.checked);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="text-4xl font-semibold mb-12">cheersly</div>

        <div className="text-2xl font-medium">Hey there!</div>

        <div className="text-xl font-normal mt-2">
          Let&apos;s setup Cheersly for your team.
        </div>

        <div className="mt-10">
          <div className="flex items-center">
            <Checkbox
              checked={consentEmailChecked}
              onChange={handleCheckConsentContactEmail}
            />
            <span>I would like to recieve marketing emails</span>
          </div>

          <div className="flex items-center">
            <Checkbox checked={tosChecked} onChange={handleCheckTOS} />
            <span>
              I agree to the{" "}
              <a href="/tos" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
            </span>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href={process.env.REACT_APP_SLACK_SIGNUP_URL} className="disabled">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
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
