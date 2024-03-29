import React from "react";
import { Link } from "react-router-dom";
// import Checkbox from "@mui/material/Checkbox";
import ImageAssets from "../../../assets/images";

export default function SignUp() {
  // const [consentEmailChecked, setConsentEmailChecked] = useState(false);

  // const [tosChecked, setTosChecked] = useState(false);

  // const handleCheckConsentContactEmail = (event: any) => {
  //   setConsentEmailChecked(event.target.checked);
  // };

  // const handleCheckTOS = (event: any) => {
  //   setTosChecked(event.target.checked);
  // };

  return (
    <div className="flex h-screen w-full bg-yellow-extra-light">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="w-1/2 mb-12">
          <img src={ImageAssets.LogoWithText} alt="" />
        </div>

        <div className="text-2xl font-medium">Hey there!</div>

        <div className="text-xl font-normal mt-2">
          Let&apos;s setup Cheersly for your team.
        </div>

        {/* <div className="mt-10">
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
        </div> */}

        <div className="mt-10 flex justify-center">
          <a href={process.env.REACT_APP_SLACK_SIGNUP_URL}>
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        </div>

        <div className="mt-10">
          Already signed up?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        <img src={ImageAssets.HappyTeam} alt="" />
      </div>
    </div>
  );
}
