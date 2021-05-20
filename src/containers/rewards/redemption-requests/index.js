import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Spinner from "../../../components/Spinner";
import {
  SecondaryButton,
  DangerButton,
} from "../../../components/CustomButton";
import SettleRedemptionRequestDialog from "../../../components/SettleRedemptionRequestDialog";
import DeclineRedemptionRequestDialog from "../../../components/DeclineRedemptionRequestDialog";
import SnackBar from "../../../components/SnackBar";
import {
  getRedemptionRequestsListSagaAction,
  settlteRedemptionRequestSagaAction,
  declineRedemptionRequestSagaAction,
  setSnackbarForRedemptionRequests,
  setRedemptionRequestsPageIndex,
  setRedemptionRequestsPageSize,
} from "../state/actions";
import { resolveRedemptionCreatedDaysOld } from "../../../utils/common";
import ImageAssets from "../../../assets/images";
import "./styles.css";

const RewardsRedemptionRequestsContainer = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    redemptionRequests,
    snackBarForRedemptionRequests,
    redemptionRequestPageIndex,
    redemptionRequestPageSize,
  } = useSelector((state) => state.rewards);

  const [selectedRedemptionRequest, setSelectedRedemptionRequest] = useState(
    {}
  );

  const [
    shouldShowSettleRedemptionRequestDialog,
    setShouldShowSettleRedemptionRequestDialog,
  ] = useState(false);

  const [
    shouldShowDeclineRedemptionRequestDialog,
    setShouldShowDeclineRedemptionRequestDialog,
  ] = useState(false);

  const handleChangePage = (event, newPage) => {
    setRedemptionRequestsPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRedemptionRequestsPageSize(parseInt(event.target.value, 10));
    setRedemptionRequestsPageIndex(0);
  };

  const handleSettleRedemptionRequest = (id) => {
    setSelectedRedemptionRequest({ id });
    setShouldShowSettleRedemptionRequestDialog(true);
  };

  const handleCloseSettleRedemptionRequestDialog = () => {
    setSelectedRedemptionRequest({});
    setShouldShowSettleRedemptionRequestDialog(false);
  };

  const handleDeclineRedemptionRequest = (id) => {
    setSelectedRedemptionRequest({ id });
    setShouldShowDeclineRedemptionRequestDialog(true);
  };

  const handleCloseDeclineRedemptionRequestDialog = () => {
    setSelectedRedemptionRequest({});
    setShouldShowDeclineRedemptionRequestDialog(false);
  };

  const settleRedemptionRequest = () => {
    dispatch(
      settlteRedemptionRequestSagaAction({ id: selectedRedemptionRequest.id })
    );
    setSelectedRedemptionRequest({});
    setShouldShowSettleRedemptionRequestDialog(false);
  };

  const declineRedemptionRequest = () => {
    dispatch(
      declineRedemptionRequestSagaAction({ id: selectedRedemptionRequest.id })
    );
    setSelectedRedemptionRequest({});
    setShouldShowDeclineRedemptionRequestDialog(false);
  };

  const handleCloseSnackBar = () => {
    dispatch(setSnackbarForRedemptionRequests({}));
  };

  useEffect(() => {
    dispatch(
      getRedemptionRequestsListSagaAction({
        pageIndex: redemptionRequestPageIndex,
        pageSize: redemptionRequestPageSize,
      })
    );
  }, []);

  return (
    <div className="rewards-redemption-request-container">
      {isLoading ? (
        <div className="rewards-loader">
          <Spinner />
        </div>
      ) : (
        <div>
          <SnackBar
            open={snackBarForRedemptionRequests.severity ? true : false}
            handleClose={handleCloseSnackBar}
            severity={snackBarForRedemptionRequests.severity}
            message={snackBarForRedemptionRequests.message}
          />

          <div className="rewards-redemption-request-card-container">
            {redemptionRequests.map((redemptionRequest) => (
              <div
                className="rewards-redemption-request-card"
                key={redemptionRequest.id}
              >
                <div className="rewards-redemption-request-card-reward-info">
                  <div className="rewards-redemption-request-card-reward-title">
                    {redemptionRequest.reward.title}
                  </div>

                  <div className="rewards-redemption-request-card-reward-price">
                    {redemptionRequest.reward.price}
                    <img
                      src={ImageAssets.CheersCoin}
                      alt=""
                      height="25px"
                      width="25px"
                      style={{ marginLeft: 5 }}
                    />
                  </div>
                </div>

                <div className="rewards-redemption-request-card-user-info">
                  <div>
                    <Avatar
                      alt=""
                      src={
                        redemptionRequest.user.slackUserData.profile.image_192
                      }
                    />
                  </div>
                  <div className="rewards-redemption-request-card-user-name">
                    {redemptionRequest.user.slackUserData.real_name}
                  </div>
                  <div className="rewards-redemption-request-card-created-at">
                    {resolveRedemptionCreatedDaysOld(
                      redemptionRequest.createdAt
                    )}
                  </div>
                </div>

                <div className="rewards-redemption-request-card-actions-container">
                  <div>
                    <SecondaryButton
                      onClick={() =>
                        handleSettleRedemptionRequest(redemptionRequest.id)
                      }
                    >
                      Mark as Settled
                    </SecondaryButton>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <DangerButton
                      onClick={() =>
                        handleDeclineRedemptionRequest(redemptionRequest.id)
                      }
                    >
                      Decline
                    </DangerButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shouldShowSettleRedemptionRequestDialog && (
            <SettleRedemptionRequestDialog
              open={shouldShowSettleRedemptionRequestDialog}
              handleClose={handleCloseSettleRedemptionRequestDialog}
              handleSave={settleRedemptionRequest}
            />
          )}

          {shouldShowDeclineRedemptionRequestDialog && (
            <DeclineRedemptionRequestDialog
              open={shouldShowDeclineRedemptionRequestDialog}
              handleClose={handleCloseDeclineRedemptionRequestDialog}
              handleSave={declineRedemptionRequest}
            />
          )}
        </div>
      )}

      {!redemptionRequests.length && !isLoading && (
        <div className="no-rewards-redemption-request-text">
          No redemption requests available!
        </div>
      )}
    </div>
  );
};

export default RewardsRedemptionRequestsContainer;
