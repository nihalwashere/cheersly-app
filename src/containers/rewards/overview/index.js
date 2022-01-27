import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from "../../../components/Spinner";
import CreateRewardDialog from "../../../components/CreateRewardDialog";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/CustomButton";
import DeleteRewardDialog from "../../../components/DeleteRewardDialog";
import SnackBar from "../../../components/SnackBar";
import {
  getRewardsListSagaAction,
  createRewardSagaAction,
  updateRewardSagaAction,
  deleteRewardSagaAction,
  createRedemptionRequestSagaAction,
  setSnackbarForRewardsOverview,
} from "../state/actions";
import { USER_ROLE } from "../../../enums/userRoles";
import ImageAssets from "../../../assets/images";
import "./styles.css";

const RewardsOverviewContainer = () => {
  const dispatch = useDispatch();

  const {
    cheersStat: { cheersRedeemable },
  } = useSelector((state) => state.root);

  const { role, userId } = useSelector((state) => state.auth);

  const { isLoading, rewards, snackBarForRewardsOverview } = useSelector(
    (state) => state.rewards
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedReward, setSelectedReward] = useState({});

  const [shouldShowCreateRewardDialog, setShouldShowCreateRewardDialog] =
    useState(false);

  const [shouldShowDeleteRewardDialog, setShouldShowDeleteRewardDialog] =
    useState(false);

  const handleRewardCreate = () => {
    setShouldShowCreateRewardDialog(true);
  };

  const handleCloseCreateRewardDialog = () => {
    setShouldShowCreateRewardDialog(false);

    if (isEditMode) {
      setSelectedReward({});
      setIsEditMode(false);
    }
  };

  const handleRewardUpdate = (payload) => {
    setIsEditMode(true);
    setSelectedReward(payload);
    setShouldShowCreateRewardDialog(true);
  };

  const handleRewardDelete = (id) => {
    setSelectedReward({ id });
    setShouldShowDeleteRewardDialog(true);
  };

  const handleCloseRewardDelete = () => {
    setSelectedReward({});
    setShouldShowDeleteRewardDialog(false);
  };

  const createReward = ({ title, description, price }) => {
    dispatch(createRewardSagaAction({ title, description, price }));
    setShouldShowCreateRewardDialog(false);
  };

  const updateReward = ({ id, title, description, price }) => {
    dispatch(updateRewardSagaAction({ id, title, description, price }));
    setSelectedReward({});
    setShouldShowCreateRewardDialog(false);
  };

  const deleteReward = () => {
    dispatch(deleteRewardSagaAction({ id: selectedReward.id }));
    setSelectedReward({});
    setShouldShowDeleteRewardDialog(false);
  };

  const handleSaveReward = (payload) => {
    if (isEditMode) {
      return updateReward(payload);
    }

    createReward(payload);
  };

  const handleCreateRedemptionRequest = (rewardId) => {
    dispatch(createRedemptionRequestSagaAction({ userId, rewardId }));
  };

  const handleCloseSnackBar = () => {
    dispatch(setSnackbarForRewardsOverview({}));
  };

  useEffect(() => {
    dispatch(getRewardsListSagaAction());
  }, []);

  return (
    <div className="rewards-overview-container">
      {isLoading ? (
        <div className="rewards-loader">
          <Spinner />
        </div>
      ) : (
        <div>
          <SnackBar
            open={snackBarForRewardsOverview.severity ? true : false}
            handleClose={handleCloseSnackBar}
            severity={snackBarForRewardsOverview.severity}
            message={snackBarForRewardsOverview.message}
          />

          <div className="rewards-overview-create-button-cheers-stat-container">
            <div className="rewards-overview-cheers-stat">
              Cheers Redeemable:{" "}
              <span className="rewards-overview-cheers-stat-count">
                {cheersRedeemable}
              </span>
            </div>

            {role === USER_ROLE.ADMIN && (
              <div className="rewards-overview-create-button-container">
                <PrimaryButton onClick={handleRewardCreate}>
                  + Add Reward
                </PrimaryButton>
              </div>
            )}
          </div>

          <div className="rewards-overview-card-container">
            {rewards.map((reward) => (
              <div className="rewards-overview-card" key={reward.id}>
                <div className="rewards-overview-card-title-actions-container">
                  <div className="rewards-overview-card-title">
                    {reward.title}
                  </div>

                  {role === USER_ROLE.ADMIN && (
                    <div>
                      <IconButton onClick={() => handleRewardUpdate(reward)}>
                        <EditIcon style={{ width: 20, height: 20 }} />
                      </IconButton>

                      <IconButton onClick={() => handleRewardDelete(reward.id)}>
                        <DeleteIcon style={{ width: 20, height: 20 }} />
                      </IconButton>
                    </div>
                  )}
                </div>
                <div className="rewards-overview-card-description">
                  {reward.description}
                </div>

                <div className="rewards-overview-card-price-redeem-button-container">
                  <div className="rewards-overview-card-price">
                    {reward.price}{" "}
                    <img
                      src={ImageAssets.CheersCoin}
                      alt=""
                      height="25px"
                      width="25px"
                      style={{ marginLeft: 5 }}
                    />
                  </div>

                  <div>
                    <SecondaryButton
                      onClick={() => handleCreateRedemptionRequest(reward.id)}
                    >
                      Redeem
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shouldShowCreateRewardDialog && (
            <CreateRewardDialog
              open={shouldShowCreateRewardDialog}
              handleClose={handleCloseCreateRewardDialog}
              handleSave={handleSaveReward}
              isEditMode={isEditMode}
              selectedReward={selectedReward}
            />
          )}

          {shouldShowDeleteRewardDialog && (
            <DeleteRewardDialog
              open={shouldShowDeleteRewardDialog}
              handleClose={handleCloseRewardDelete}
              handleSave={deleteReward}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RewardsOverviewContainer;
