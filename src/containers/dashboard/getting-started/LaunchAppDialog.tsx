import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import Link from "@mui/material/Link";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import Button from "../../../components/Button";

type Props = {
  open: boolean;
  onClose: any;
  onLaunch: any;
};

export default function LaunchAppDialog(props: Props) {
  const { open, onClose, onLaunch } = props;

  const [state, setState] = useMergeState({
    message: "",
    shouldSendOnboardingMessage: false,
    shouldAddCustomMessage: false,
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

  const handleCheck = (event: any) => {
    setState({
      [event.target.name]: event.target.checked,
    });
  };

  const toggleShouldAddCustomMessage = () => {
    setState({ shouldAddCustomMessage: !state.shouldAddCustomMessage });
  };

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (state.shouldAddCustomMessage && !state.message) {
      payload = { ...payload, message: true };
      isValid = false;
    }

    setState({ errors: { ...payload } });

    return isValid;
  };

  const handleLaunch = () => {
    if (!isFormValid()) {
      return;
    }

    const payload = { ...state };

    delete payload.errors;

    onLaunch(payload);
  };

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event);
        }
      }}
      open={open}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle onClose={onClose}>
        <span className="text-xl font-semibold">Launch Cheersly</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="text-base">
          It&apos;s time to go live! Launch Cheersly so that your team can start
          using their recognition channels.
        </div>

        <div className="mt-4 mb-2">
          <span className="font-semibold">Send onboarding message</span>

          <Switch
            name="shouldSendOnboardingMessage"
            checked={state.shouldSendOnboardingMessage}
            onChange={handleCheck}
          />
        </div>

        {state.shouldSendOnboardingMessage && (
          <div>
            <div className="text-xs mb-4">
              Please note, this will notify each and every user present in your
              Slack workspace.
            </div>

            {/* eslint-disable-next-line */}
            <Link
              component="button"
              variant="body2"
              onClick={toggleShouldAddCustomMessage}
            >
              {state.shouldAddCustomMessage ? "Remove" : "Add"} custom message
            </Link>
          </div>
        )}

        {state.shouldSendOnboardingMessage && !state.shouldAddCustomMessage && (
          <div className="w-full mt-5 mb-2">
            <TextareaAutosize
              minRows={15}
              className="w-full bg-gray-100"
              placeholder={`Hey there! I'm Cheersly, the employee engagement and peer recognition app for Slack.

I am here to help your team recognize each other for all of the meaningful contributions that you make.

Here's how it works:

Use the command /cheers to share cheers with your peers.

Show some support
Add any reaction to cheers that are posted publicly as a fun way to show your support to your peers.

Earn & redeem points
Accrue points from cheers to redeem in our reward catalog.

Fun Icebreakers
Spark funny conversations with your peers.

Play 1-1 Games
Play Tic Tac Toe or Stone Paper Scissors with your co-worker.
`}
              disabled
            />
          </div>
        )}

        {state.shouldSendOnboardingMessage && state.shouldAddCustomMessage && (
          <div className="w-full mt-5 mb-2">
            <TextareaAutosize
              name="message"
              className="w-full bg-gray-100"
              placeholder="Enter your onboarding message here..."
              minRows={10}
              maxLength={500}
              value={state.message}
              onChange={handleChange}
            />

            {state?.errors?.message && (
              <ErrorMessage message="Custom message is required" />
            )}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button label="Launch Cheersly" onClick={handleLaunch} />
      </DialogActions>
    </Dialog>
  );
}
