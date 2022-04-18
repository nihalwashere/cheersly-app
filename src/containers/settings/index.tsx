import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import Button from "../../components/Button";
import { useMergeState } from "../../utils/custom-hooks";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import UserSearchBox from "../../components/UserSearchBox";
import {
  setMessage,
  getTeamSettingsSaga,
  updateTeamSettingsSaga,
} from "./state/actions";

export default function Settings() {
  const dispatch = useDispatch();

  const { isLoading, message, settings } = useSelector(
    (state: any) => state.settings
  );

  const [state, setState] = useMergeState({
    isActivated: null,
    admins: [],
    allowanceReloaded: null,
    pointsAboutToExpire: null,
    inactivityReminders: null,
    pointsAvailableToRedeem: null,
    requireCompanyValues: null,
    enableSharingGiphys: null,
    enableGiftCards: null,
    errors: {},
  });

  const handleCheck = (event: any) => {
    setState({
      [event.target.name]: event.target.checked,
    });
  };

  const handleAdminsChange = (newAdmins: any) => {
    setState({ admins: newAdmins });
  };

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (!state.admins.length) {
      payload = { ...payload, admins: true };
      isValid = false;
    }

    setState({ errors: { ...payload } });

    return isValid;
  };

  const handleSave = () => {
    if (!isFormValid()) {
      return;
    }

    const payload = { ...state };

    delete payload.errors;

    dispatch(updateTeamSettingsSaga(payload));
  };

  useEffect(() => {
    dispatch(getTeamSettingsSaga());
  }, []);

  useEffect(() => {
    setState({
      isActivated: settings.isActivated,
      admins: settings.admins,
      allowanceReloaded: settings.allowanceReloaded,
      pointsAboutToExpire: settings.pointsAboutToExpire,
      inactivityReminders: settings.inactivityReminders,
      pointsAvailableToRedeem: settings.inactivityReminders,
      requireCompanyValues: settings.requireCompanyValues,
      enableSharingGiphys: settings.enableSharingGiphys,
      enableGiftCards: settings.enableGiftCards,
    });
  }, [settings]);

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

      <div className="text-xl font-semibold">Team Settings</div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="w-full">
          <div>
            <div className="mt-5 flex justify-between items-start">
              <div className="w-1/4 flex flex-col">
                <span className="font-semibold">Activate Cheersly</span>
                <span className="text-xs">
                  Disable or enable Cheersly for your team. Users won&apos;t be
                  able to use Cheersly if this is disabled.
                </span>
              </div>

              <div className="w-3/5 mt-2 mb-2">
                <Switch
                  name="isActivated"
                  checked={state.isActivated}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-between items-start">
              <div className="w-1/4 flex flex-col">
                <span className="font-semibold">Require company values</span>
                <span className="text-xs">
                  Enable if company values should be mandatorily tagged when
                  sharing cheers.
                </span>
              </div>

              <div className="w-3/5 mt-2 mb-2">
                <Switch
                  name="requireCompanyValues"
                  checked={state.requireCompanyValues}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-between items-start">
              <div className="w-1/4 flex flex-col">
                <span className="font-semibold">
                  Enable sharing Giphy&apos;s
                </span>
                <span className="text-xs">
                  Enable if you would like to allow your team to share
                  Giphy&apos; while posting cheers. It would be completely
                  optional.
                </span>
              </div>

              <div className="w-3/5 mt-2 mb-2">
                <Switch
                  name="enableSharingGiphys"
                  checked={state.enableSharingGiphys}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-between items-start">
              <div className="w-1/4 flex flex-col">
                <span className="font-semibold">Admins</span>
                <span className="text-xs">
                  Users who hav access to all the features of the platform.
                </span>
              </div>

              <div className="w-3/5 mt-2 mb-2">
                <UserSearchBox
                  value={state.admins}
                  onChange={handleAdminsChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-xl font-semibold">Reward Settings</div>

            <div className="mt-5 flex justify-between items-start">
              <div className="w-1/4 flex flex-col">
                <span className="font-semibold">Enable gift cards</span>
                <span className="text-xs">
                  Redeem your Cheersly points for gift cards from popular
                  retailers around the world.
                </span>
              </div>

              <div className="w-3/5 mt-2 mb-2">
                <Switch
                  name="enableGiftCards"
                  checked={state.enableGiftCards}
                  onChange={handleCheck}
                />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-xl font-semibold">Nudge Settings</div>

            <span className="text-xs">
              Reminders to boost team participation.
            </span>

            <div className="mt-2 flex justify-between items-center">
              <div className="w-2/4 flex flex-col">
                <span className="text-base">
                  Allowance reloaded (Start of month)
                </span>
              </div>

              <div className="w-3/5">
                <Switch
                  name="allowanceReloaded"
                  checked={state.allowanceReloaded}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="w-2/4 flex flex-col">
                <span className="text-base">
                  Points about to expire (End of month)
                </span>
              </div>

              <div className="w-3/5">
                <Switch
                  name="pointsAboutToExpire"
                  checked={state.pointsAboutToExpire}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="w-2/4 flex flex-col">
                <span className="text-base">Inactivity reminders</span>
              </div>

              <div className="w-3/5">
                <Switch
                  name="inactivityReminders"
                  checked={state.inactivityReminders}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="w-2/4 flex flex-col">
                <span className="text-base">Points available to redeem</span>
              </div>

              <div className="w-3/5">
                <Switch
                  name="pointsAvailableToRedeem"
                  checked={state.pointsAvailableToRedeem}
                  onChange={handleCheck}
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <Button label="Save" onClick={handleSave} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
