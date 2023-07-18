import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import LaunchAppDialog from "./LaunchAppDialog";
import { useMergeState } from "../../../utils/custom-hooks";
import {
  setMessage,
  getTeamGettingStartedStepsSaga,
  enableAppForTeamSaga,
} from "../state/actions";

export default function GettingStarted() {
  const dispatch = useDispatch();

  const {
    message,
    isLoading,
    gettingStartedSteps: {
      recognitionTeamCreated,
      companyValuesCreated,
      rewardRedemptionsEnabled,
      appLaunched,
      paymentMethodAdded,
    },
  } = useSelector((state: any) => state.dashboard);

  const [state, setState] = useMergeState({
    shouldShowLaunchDialog: false,
  });

  const handleOpenLaunchDialog = () => {
    setState({ shouldShowLaunchDialog: true });
  };

  const handleCloseLaunchDialog = () => {
    setState({ shouldShowLaunchDialog: false });
  };

  const handleLaunch = (payload: any) => {
    dispatch(enableAppForTeamSaga(payload));
    handleCloseLaunchDialog();
  };

  useEffect(() => {
    dispatch(getTeamGettingStartedStepsSaga());
  }, []);

  return (
    <div className="w-full">
      {message?.type && (
        <Alert
          severity={message.type}
          message={message.value}
          open={Object.keys(message).length ? true : false}
          onClose={() => dispatch(setMessage({}))}
        />
      )}

      <div className="text-xl font-semibold">Getting started</div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="w-full">
          <div className="mt-10 flex justify-center">
            <div className="getting-started-card p-8 w-11/12">
              <div className="text-xl font-semibold">
                Getting started with Cheersly
              </div>
              <div className="text-sm">
                Here are a few things you can do to get started.
              </div>

              <div className="mt-5">
                <Link to="/recognition/teams">
                  <div className="p-4 bg-yellow-extra-light cursor-pointer flex items-center">
                    <div className="mr-2">
                      {recognitionTeamCreated ? (
                        <CheckCircleIcon />
                      ) : (
                        <CircleIcon />
                      )}
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        Create a recognition team
                      </div>
                      <div className="text-sm mt-2">
                        Before anyone can start using Cheersly, you&apos;ll need
                        to create a recognition team and pick a channel in Slack
                        to use. You can add as many as you like.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/recognition/company-values">
                  <div className="p-4 bg-yellow-extra-light cursor-pointer flex items-center mt-4">
                    <div className="mr-2">
                      {companyValuesCreated ? (
                        <CheckCircleIcon />
                      ) : (
                        <CircleIcon />
                      )}
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        Create taggable company values
                      </div>
                      <div className="text-sm mt-2">
                        Let your team tag values to support your company&apos;s
                        vision and shape its culture.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/settings">
                  <div className="p-4 bg-yellow-extra-light cursor-pointer flex items-center mt-4">
                    <div className="mr-2">
                      {rewardRedemptionsEnabled ? (
                        <CheckCircleIcon />
                      ) : (
                        <CircleIcon />
                      )}
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        Enable reward redemptions
                      </div>
                      <div className="text-sm mt-2">
                        Setup custom rewards and choose to enable gift card
                        redemptions.
                      </div>
                    </div>
                  </div>
                </Link>

                <div
                  className="p-4 bg-yellow-extra-light cursor-pointer flex items-center mt-4"
                  onClick={handleOpenLaunchDialog}
                >
                  <div className="mr-2">
                    {appLaunched ? <CheckCircleIcon /> : <CircleIcon />}
                  </div>
                  <div>
                    <div className="text-base font-semibold">
                      Launch Cheersly
                    </div>
                    <div className="text-sm mt-2">
                      It&apos;s time to switch everything ON so that your team
                      can start using Cheersly.
                    </div>
                  </div>
                </div>

                <Link to="/billing/subscription">
                  <div className="p-4 bg-yellow-extra-light cursor-pointer flex items-center mt-4">
                    <div className="mr-2">
                      {paymentMethodAdded ? (
                        <CheckCircleIcon />
                      ) : (
                        <CircleIcon />
                      )}
                    </div>
                    <div>
                      <div className="text-base font-semibold">
                        Add a payment method
                      </div>
                      <div className="text-sm mt-2">
                        Enjoy your free trial, but it would be a great idea to
                        add a credit card to avoid any interruptions.
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.shouldShowLaunchDialog && (
        <LaunchAppDialog
          open={state.shouldShowLaunchDialog}
          onClose={handleCloseLaunchDialog}
          onLaunch={handleLaunch}
        />
      )}
    </div>
  );
}
