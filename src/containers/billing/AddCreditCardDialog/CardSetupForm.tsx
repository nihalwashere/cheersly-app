import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import TextField from "@mui/material/TextField";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import CardSection from "./CardSection";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMergeState } from "../../../utils/custom-hooks";
import { saveCardDetailsSaga } from "../state/actions";

type Props = {
  clientSecret: string;
};

export default function CardSetupForm(props: Props) {
  const { clientSecret = "" } = props;

  const stripe = useStripe();

  const elements = useElements();

  const dispatch = useDispatch();

  const { addCreditCardDialogConfig } = useSelector(
    (store: any) => store.billing
  );

  const [state, setState] = useMergeState({
    cardHolderName: "",
    isSubmitting: false,
    message: { type: "", value: "" },
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

  const isFormValid = () => {
    let isValid = true;

    let payload = {};

    if (!state.cardHolderName) {
      payload = { cardHolderName: true };
      isValid = false;
    }

    setState({ errors: { ...payload } });

    return isValid;
  };

  const handleSave = async () => {
    if (!stripe || !elements || !clientSecret || !isFormValid()) {
      return;
    }

    dispatch(
      saveCardDetailsSaga({
        stripe,
        elements,
        CardElement,
        clientSecret,
        cardHolderName: state.cardHolderName,
      })
    );
  };

  const disabled =
    !stripe ||
    !elements ||
    !clientSecret ||
    addCreditCardDialogConfig?.isSavingCardDetails;

  return (
    <div>
      {state?.message?.type && (
        <Alert
          severity={state?.message.type}
          message={state?.message.value}
          open={Object.keys(state?.message).length ? true : false}
          onClose={() => setState({ message: {} })}
        />
      )}

      <div className="mt-4 mb-5">
        <TextField
          fullWidth
          label="Cardholder name"
          name="cardHolderName"
          value={state.cardHolderName}
          onChange={handleChange}
          required
          error={state?.errors?.cardHolderName}
        />

        {state?.errors?.cardHolderName && (
          <ErrorMessage message="Cardholder name is required" />
        )}
      </div>

      <div>
        <CardSection />
      </div>

      <div className="flex justify-end mt-10">
        <Button
          label="Save credit card"
          onClick={handleSave}
          disabled={disabled}
          loading={addCreditCardDialogConfig?.isSavingCardDetails}
          loaderButton
        />
      </div>
    </div>
  );
}
