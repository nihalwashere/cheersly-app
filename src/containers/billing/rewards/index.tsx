import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import PaidIcon from "@mui/icons-material/Paid";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import TopUpPointsDialog from "./TopUpPointsDialog";
import TopUpDetailsDialog from "./TopUpDetailsDialog";
import {
  setMessage,
  getRewardStatsSaga,
  setTopUpDialogConfig,
  getTeamPointTopUpsSaga,
  getPaymentDetailsSaga,
} from "../state/actions";
import { formatDate } from "../../../utils/date";
import { useMergeState } from "../../../utils/custom-hooks";

export default function Settings() {
  const dispatch = useDispatch();

  const [state, setState] = useMergeState({
    shouldShowTopUpDetailsDialog: false,
    selectedTopUp: {},
  });

  const {
    isLoading,
    message,
    rewardStats,
    topUpDialogConfig,
    pointTopUps,
    paymentDetails,
  } = useSelector((store: any) => store.billing);

  const handleOpenTopUpDialog = () => {
    dispatch(setTopUpDialogConfig({ open: true }));
  };

  const handleCloseTopUpDialog = () => {
    dispatch(setTopUpDialogConfig({ open: false }));
  };

  const handleOpenTopUpDetailsDialog = (selectedTopUp: any) => {
    dispatch(
      getPaymentDetailsSaga({
        paymentIntentId: selectedTopUp.paymentIntentId,
      })
    );
    setState({ shouldShowTopUpDetailsDialog: true, selectedTopUp });
  };

  const handleCloseTopUpDetailsDialog = () => {
    setState({ shouldShowTopUpDetailsDialog: false, selectedTopUp: {} });
  };

  useEffect(() => {
    dispatch(getRewardStatsSaga());
    dispatch(getTeamPointTopUpsSaga());
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

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Rewards</span>

            <Button
              label="Top-up points"
              onClick={handleOpenTopUpDialog}
              startIcon={<PaidIcon style={{ color: "#ffffff" }} />}
            />
          </div>

          <div className="mt-5">
            <div className="font-semibold">Current balance</div>
            <div className="mt-4 flex justify-between">
              <div className="w-64 flex flex-col items-center rounded-md p-2 border-2 bg-slate-100">
                <span className="text-xs text-gray-500">Purchased points</span>
                <span className="font-semibold">
                  {rewardStats?.purchasedPoints} points
                </span>
              </div>

              <div className="w-64 flex flex-col items-center rounded-md p-2 border-2 bg-slate-100">
                <span className="text-xs text-gray-500">
                  Redemption points this month
                </span>
                <span className="font-semibold">
                  {rewardStats?.redemptionPoints} points
                </span>
              </div>

              <div className="w-64 flex flex-col items-center rounded-md p-2 border-2 bg-slate-100">
                <span className="text-xs text-gray-500">
                  Redemption cost this month
                </span>
                <span className="font-semibold">
                  {parseFloat(rewardStats?.redemptionCosts).toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="font-semibold">Previous top-ups</div>

            <div className="mt-4">
              {pointTopUps.map((elem: any) => (
                <div
                  key={elem._id}
                  className="p-2 card flex justify-between items-center mb-4"
                >
                  <div className="text-base">
                    <span className="font-semibold">·</span> Top up of{" "}
                    <span className="font-semibold">{elem.points} points</span>{" "}
                    on {formatDate(elem.createdAt, "lll")}
                  </div>
                  {/* eslint-disable-next-line */}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => handleOpenTopUpDetailsDialog(elem)}
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {topUpDialogConfig?.open && (
            <TopUpPointsDialog
              open={topUpDialogConfig?.open}
              onClose={handleCloseTopUpDialog}
            />
          )}

          {state.shouldShowTopUpDetailsDialog && (
            <TopUpDetailsDialog
              open={state.shouldShowTopUpDetailsDialog}
              onClose={handleCloseTopUpDetailsDialog}
              topupDetails={state.selectedTopUp}
              paymentDetails={paymentDetails}
            />
          )}
        </div>
      )}
    </div>
  );
}
