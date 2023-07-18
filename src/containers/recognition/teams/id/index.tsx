import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MenuItem from "@mui/material/MenuItem";
import TextField from "../../../../components/TextField";
import Button from "../../../../components/Button";
import Spinner from "../../../../components/Spinner";
import Alert from "../../../../components/Alert";
import ErrorMessage from "../../../../components/ErrorMessage";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import UserSearchBox from "../../../../components/UserSearchBox";
import Select from "../../../../components/Select";
import { useMergeState } from "../../../../utils/custom-hooks";
import {
  setMessage,
  getSlackChannelsSaga,
  getTeamDetailsSaga,
  updateTeamSaga,
  deleteTeamSaga,
} from "../../state/actions";

export default function TeamDetails() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { teamId } = useParams();

  const { isLoading, message, teamDetails, slackChannels } = useSelector(
    (state: any) => state.recognition
  );

  const [state, setState] = useMergeState({
    name: "",
    channel: {
      id: "",
      name: "",
    },
    pointAllowance: "",
    pointAmountOptions: [],
    managers: [],
    confirm: { title: "", message: "", open: false },
    errors: {},
  });

  const handleChange = (event: any) => {
    setState({
      [event.target.name]: event.target.value,
      errors: {
        [event.target.name]: false,
      },
    });
  };

  const handleChannelChange = (event: any) => {
    setState({
      channel: {
        id: event.target.value.id,
        name: event.target.value.name,
      },
      errors: {
        ...state.errors,
        channel: false,
      },
    });
  };

  const handlePointAmountOptionsChange = (pointAmountOptions: any) => {
    setState({
      pointAmountOptions,
      errors: {
        ...state.errors,
        pointAmountOptions: false,
      },
    });
  };

  const handleManagersChange = (managers: any) => {
    setState({
      managers,
      errors: {
        ...state.errors,
        managers: false,
      },
    });
  };

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (!state.name) {
      payload = { ...payload, name: true };
      isValid = false;
    }

    if (!state.channel?.id) {
      payload = { ...payload, channel: true };
      isValid = false;
    }

    if (!state.pointAllowance) {
      payload = { ...payload, pointAllowance: true };
      isValid = false;
    }

    if (!state.pointAmountOptions.length) {
      payload = { ...payload, pointAmountOptions: true };
      isValid = false;
    }

    if (!state.managers.length) {
      payload = { ...payload, managers: true };
      isValid = false;
    }

    setState({ errors: { ...payload } });

    return isValid;
  };

  const handleSave = () => {
    if (!isFormValid()) {
      return;
    }

    const payload = {
      name: state.name,
      channel: state.channel,
      pointAllowance: state.pointAllowance,
      pointAmountOptions: state.pointAmountOptions,
      managers: state.managers.map((elem: any) => elem._id),
    };

    if (teamId) {
      dispatch(updateTeamSaga(teamId, payload));
    }
  };

  const handleOpenConfirmationDialog = () => {
    setState({
      confirm: {
        title: "Delete Team",
        message: "Are you sure you want to delete this team?",
        open: true,
      },
    });
  };

  const handleCloseConfirmationDialog = () => {
    setState({
      confirm: {
        title: "",
        message: "",
        open: false,
      },
    });
  };

  const handleDelete = () => {
    if (teamId) {
      dispatch(deleteTeamSaga(teamId, navigate));
    }
  };

  const handleConfirmConfirmationDialog = () => {
    handleDelete();
    handleCloseConfirmationDialog();
  };

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamDetailsSaga(teamId));
    }

    dispatch(getSlackChannelsSaga());
  }, []);

  useEffect(() => {
    setState({
      name: teamDetails?.name,
      channel: teamDetails?.channel,
      pointAllowance: teamDetails?.pointAllowance,
      pointAmountOptions: teamDetails?.pointAmountOptions,
      members: teamDetails?.members,
      managers: teamDetails?.managers,
    });
  }, [teamDetails]);

  return (
    <div>
      <div className="w-full">
        <div className="text-xl mt-4">
          <Breadcrumbs separator=">">
            <div
              onClick={() => navigate(-1)}
              className="text-base underline cursor-pointer"
            >
              Teams
            </div>
            <span className="text-lg">{teamDetails?.name}</span>
          </Breadcrumbs>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner loading={isLoading} />
          </div>
        ) : (
          <div className="w-full">
            {message?.type && (
              <Alert
                severity={message.type}
                message={message.value}
                open={Object.keys(message).length ? true : false}
                onClose={() => dispatch(setMessage({}))}
              />
            )}

            <div className="mt-4">
              <div className="text-lg font-semibold">Settings</div>

              <div className="mt-10 flex justify-between items-start">
                <div className="w-1/4 flex flex-col">
                  <span className="font-semibold">Name</span>
                  <span className="text-sm">
                    An identification name for this team.
                  </span>
                </div>

                <div className="w-3/4 mt-2 mb-2">
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    required
                    error={state?.errors?.name}
                  />

                  {state?.errors?.name && (
                    <ErrorMessage message="Name is required" />
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-between items-start">
                <div className="w-1/4 flex flex-col">
                  <span className="font-semibold">Slack Channel</span>
                  <span className="text-sm">
                    A channel in Slack to sync this team with.
                  </span>
                </div>

                <div className="w-3/4 mt-2 mb-2">
                  <Select
                    fullWidth
                    variant="outlined"
                    name="channel"
                    value={state.channel}
                    renderValue={(value: any) => value.name}
                    onChange={handleChannelChange}
                    error={state?.errors?.channel}
                  >
                    {slackChannels.map((item: any) => (
                      <MenuItem key={item.id} value={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {state?.errors?.channel && (
                    <ErrorMessage message="Slack channel is required" />
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-between items-start">
                <div className="w-1/4 flex flex-col">
                  <span className="font-semibold">Point Allowance</span>
                  <span className="text-sm">
                    Monthly cheers point allowance for each member of this
                    channel.
                  </span>
                </div>

                <div className="w-3/4 mt-2 mb-2">
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="pointAllowance"
                    value={state.pointAllowance}
                    onChange={handleChange}
                    required
                    error={state?.errors?.pointAllowance}
                  />

                  {state?.errors?.pointAllowance && (
                    <ErrorMessage message="Point allowance is required" />
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-between items-start">
                <div className="w-1/4 flex flex-col">
                  <span className="font-semibold">Point Amount Options</span>
                  <span className="text-sm">
                    Define the amount of points a user can give with each
                    cheers.
                  </span>
                </div>

                <div className="w-3/4 mt-2 mb-2">
                  <Autocomplete
                    freeSolo
                    multiple
                    disableClearable
                    options={[].map((option) => option)}
                    value={state.pointAmountOptions}
                    onChange={(event, newValue) => {
                      handlePointAmountOptionsChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                        }}
                        type="number"
                        error={state?.errors?.pointAmountOptions}
                      />
                    )}
                  />

                  <span className="text-xs text-gray-400">
                    Add a point amount option and hit enter, for example 10, 20,
                    30, 50, etc.
                  </span>

                  {state?.errors?.pointAmountOptions && (
                    <ErrorMessage message="Atleast one point amount option is required" />
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-between items-start">
                <div className="w-1/4 flex flex-col">
                  <span className="font-semibold">Managers</span>
                  <span className="text-sm">
                    Users who can manage this team and have access to insights.
                  </span>
                </div>

                <div className="w-3/4 mt-2 mb-2">
                  <UserSearchBox
                    value={state.managers}
                    onChange={handleManagersChange}
                    error={state?.errors?.managers}
                  />

                  {state?.errors?.managers && (
                    <ErrorMessage message="Atleast one manager is required" />
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <div className="mr-8">
                  <Button
                    variant="outlined"
                    color="error"
                    label="Delete"
                    onClick={handleOpenConfirmationDialog}
                  />
                </div>
                <Button label="Save" onClick={handleSave} />
              </div>
            </div>
          </div>
        )}
      </div>

      {state?.confirm?.open && (
        <ConfirmationDialog
          title={state?.confirm?.title}
          message={state?.confirm?.message}
          open={state?.confirm?.open}
          onClose={handleCloseConfirmationDialog}
          onConfirm={handleConfirmConfirmationDialog}
        />
      )}
    </div>
  );
}
