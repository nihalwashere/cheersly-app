import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DialogContent from "@mui/material/DialogContent";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import Spinner from "../../../components/Spinner";
import CardSetupForm from "./CardSetupForm";
import { createSetupIntentSaga } from "../state/actions";

const stripePromise = loadStripe(
  process.env?.REACT_APP_STRIPE_PUBLIC_KEY || ""
);

type Props = {
  open: boolean;
  onClose: any;
};

export default function AddCreditCardDialog(props: Props) {
  const { open, onClose } = props;

  const dispatch = useDispatch();

  const { addCreditCardDialogConfig } = useSelector(
    (store: any) => store.billing
  );

  useEffect(() => {
    dispatch(createSetupIntentSaga());
  }, []);

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event);
        }
      }}
      open={open}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle onClose={onClose}>
        <span className="text-xl font-semibold">Add new credit card</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="text-sm text-gray-400">
          This will be used for your active subscription and point top-ups.
        </div>

        {addCreditCardDialogConfig?.isCreatingSetupIntent && (
          <div className="flex justify-center mt-4">
            <Spinner
              loading={addCreditCardDialogConfig.isCreatingSetupIntent}
            />
          </div>
        )}

        {stripePromise &&
          addCreditCardDialogConfig?.clientSecret &&
          !addCreditCardDialogConfig?.isCreatingSetupIntent && (
            <div className="mt-5">
              <Elements stripe={stripePromise}>
                <CardSetupForm
                  clientSecret={addCreditCardDialogConfig.clientSecret}
                />
              </Elements>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}
