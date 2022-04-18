import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Link from "@mui/material/Link";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import ErrorMessage from "../../../components/ErrorMessage";
import AddCreditCardDialog from "../AddCreditCardDialog";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { useMergeState } from "../../../utils/custom-hooks";
import { DEFAULT_BASE_POINT_VALUE } from "../../../utils/constants";
import {
  purchasePointsSaga,
  setAddCreditCardDialogConfig,
  getPaymentMethodsSaga,
} from "../state/actions";

type Props = {
  open: boolean;
  onClose: any;
};

export default function TopUpPointsDiaog(props: Props) {
  const { open, onClose } = props;

  const dispatch = useDispatch();

  const { topUpDialogConfig, addCreditCardDialogConfig } = useSelector(
    (store: any) => store.billing
  );

  const [state, setState] = useMergeState({
    points: 100,
  });

  const handleChange = (event: any) => {
    setState({
      [event.target.name]: event.target.value,
      errors: {
        [event.target.name]: false,
      },
    });
  };

  const pointCost = (state.points * DEFAULT_BASE_POINT_VALUE).toFixed(2);

  const platformFee = (Number(pointCost) * 0.1).toFixed(2);

  const totalCost = Number(Number(pointCost) + Number(pointCost) * 0.1).toFixed(
    2
  );

  const handleOpenAddCreditCardDialog = () => {
    dispatch(setAddCreditCardDialogConfig({ open: true }));
  };

  const handleCloseAddCreditCardDialog = () => {
    dispatch(
      setAddCreditCardDialogConfig({
        open: false,
        isCreatingSetupIntent: false,
        clientSecret: "",
      })
    );
  };

  const handlePurchase = () => {
    dispatch(
      purchasePointsSaga({
        points: state.points,
        pointCost: parseFloat(pointCost),
        platformFee: parseFloat(platformFee),
        totalCost: parseFloat(totalCost),
      })
    );
  };

  useEffect(() => {
    dispatch(getPaymentMethodsSaga());
  }, []);

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose(event);
        }
      }}
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle onClose={onClose}>
        <span className="text-xl font-semibold">Top-up points</span>
      </DialogTitle>

      <DialogContent dividers>
        {!state.shouldShowAddCreditCard && (
          <div>
            <div>Instantly top-up your team&apos;s point balance.</div>

            {topUpDialogConfig?.isFetchingPaymentMethods ? (
              <div className="flex justify-center mt-4">
                <Spinner loading={topUpDialogConfig.isFetchingPaymentMethods} />
              </div>
            ) : (
              <div>
                <div className="w-2/4 mt-4 mb-4">
                  <TextField
                    type="number"
                    fullWidth
                    label="Points"
                    variant="outlined"
                    name="points"
                    value={state.points}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 100 }}
                  />

                  {state?.points < 100 && (
                    <ErrorMessage message="Minimum 100 points required" />
                  )}
                </div>

                <div className="w-2/4 flex justify-between items-center">
                  <span>Pay with:</span>

                  {topUpDialogConfig?.cardDetails?.lastFourDigits ? (
                    <div>
                      <span className="text-xs text-gray-400">
                        {String(
                          topUpDialogConfig?.cardDetails.brand
                        ).toUpperCase()}
                      </span>{" "}
                      <span className="font-semibold">
                        x{topUpDialogConfig?.cardDetails.lastFourDigits}
                      </span>{" "}
                      <span className="text-xs text-gray-400">
                        ({topUpDialogConfig?.cardDetails.expiryMonth}/
                        {topUpDialogConfig?.cardDetails.expiryYear})
                      </span>
                    </div>
                  ) : (
                    <span>
                      {/* eslint-disable-next-line */}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={handleOpenAddCreditCardDialog}
                      >
                        Add card
                      </Link>
                    </span>
                  )}
                </div>

                <div className="w-2/4 flex justify-between items-center mt-2">
                  <span>Point cost:</span>
                  <span>${pointCost}</span>
                </div>

                <div className="w-2/4 flex justify-between items-center mt-2">
                  <span>Platform fee:</span>
                  <span>${platformFee}</span>
                </div>

                <div className="w-2/4 flex justify-between items-center mt-2">
                  <span>Total cost:</span>
                  <span>${totalCost}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {addCreditCardDialogConfig?.open && (
          // <div>
          //   <Breadcrumbs>
          //     <div
          //       onClick={toggleShouldShowAddCreditCard}
          //       className="text-base underline cursor-pointer"
          //     >
          //       Back
          //     </div>
          //   </Breadcrumbs>

          // <div className="w-3/4 mt-4 mb-4">
          <AddCreditCardDialog
            open={addCreditCardDialogConfig.open}
            onClose={handleCloseAddCreditCardDialog}
          />
          //   </div>
          // </div>
        )}
      </DialogContent>

      {!state.shouldShowAddCreditCard && (
        <DialogActions>
          <Button
            label={`Purchase points for $${totalCost}`}
            onClick={handlePurchase}
          />
        </DialogActions>
      )}
    </Dialog>
  );
}
