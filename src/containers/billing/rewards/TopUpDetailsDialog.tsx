import React from "react";
import DialogContent from "@mui/material/DialogContent";
import { Dialog, DialogTitle } from "../../../components/Dialog";
import { formatDate } from "../../../utils/date";

type Props = {
  open: boolean;
  onClose: any;
  topupDetails: {
    paymentIntentId: string;
    createdAt: Date;
    points: number;
    pointCost: number;
    platformFee: number;
    totalCost: number;
  };
  paymentDetails: any;
};

export default function CreateTeamDialog(props: Props) {
  const { open, onClose, topupDetails, paymentDetails } = props;

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
        <span className="text-xl font-semibold">Top up details</span>
      </DialogTitle>

      <DialogContent dividers>
        <div className="flex justify-between items-center mt-2">
          <span>Transaction Id</span>
          <span>{topupDetails.paymentIntentId}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Transaction date & time</span>
          <span>{formatDate(topupDetails.createdAt, "lll")}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Points purchased</span>
          <span>{topupDetails.points}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Point cost</span>
          <span>${topupDetails.pointCost}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Platform fee</span>
          <span>${topupDetails.platformFee}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Total charge</span>
          <span>${topupDetails.totalCost}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span>Payment method</span>
          <div>
            <span className="text-xs text-gray-400">
              {String(
                paymentDetails?.charges?.data[0]?.payment_method_details?.card
                  ?.brand
              ).toUpperCase()}
            </span>{" "}
            <span className="font-semibold">
              x
              {
                paymentDetails?.charges?.data[0]?.payment_method_details?.card
                  ?.last4
              }
            </span>{" "}
            <span className="text-xs text-gray-400">
              (
              {
                paymentDetails?.charges?.data[0]?.payment_method_details?.card
                  ?.exp_month
              }
              /
              {
                paymentDetails?.charges?.data[0]?.payment_method_details?.card
                  ?.exp_year
              }
              )
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
