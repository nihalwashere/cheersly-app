import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Pagination from "@material-ui/lab/Pagination";
import Spinner from "../../../components/Spinner";
import SnackBar from "../../../components/SnackBar";
import {
  getRewardsHistoryListSagaAction,
  setSnackbarForRewardsHistory,
  setRewardsHistoryPageIndex,
} from "../state/actions";
import "./styles.css";

const RewardsHistoryContainer = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    rewardsHistory,
    rewardsHistoryPageIndex,
    rewardsHistoryPageSize,
    snackBarForRewardsHistory,
  } = useSelector((state) => state.rewards);

  const handleChangePage = (_, newPage) => {
    setRewardsHistoryPageIndex(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRewardsHistoryPageSize(parseInt(event.target.value, 10));
  //   setRewardsHistoryPageIndex(0);
  // };

  const handleCloseSnackBar = () => {
    dispatch(setSnackbarForRewardsHistory({}));
  };

  useEffect(() => {
    dispatch(
      getRewardsHistoryListSagaAction({
        pageIndex: rewardsHistoryPageIndex,
        pageSize: rewardsHistoryPageSize,
      })
    );
  }, []);

  return (
    <div className="rewards-history-container">
      {!rewardsHistory.length && !isLoading && (
        <div className="no-rewards-history-text">
          Nothing in history at the moment!
        </div>
      )}

      {isLoading ? (
        <div className="rewards-loader">
          <Spinner />
        </div>
      ) : (
        <div>
          <SnackBar
            open={snackBarForRewardsHistory.severity ? true : false}
            handleClose={handleCloseSnackBar}
            severity={snackBarForRewardsHistory.severity}
            message={snackBarForRewardsHistory.message}
          />

          <div className="rewards-history-card-container">
            {rewardsHistory.map((rewardHistory) => (
              <div className="rewards-history-card" key={rewardHistory.id}>
                <div className="rewards-history-card-reward-info">
                  <div className="rewards-history-card-reward-title">
                    {rewardHistory.reward.title}
                  </div>

                  <div className="rewards-history-card-reward-price">
                    ${rewardHistory.reward.price}
                  </div>
                </div>

                <div className="rewards-history-card-user-info">
                  <div>
                    <Avatar
                      alt=""
                      src={rewardHistory.user.slackUserData.profile.image_192}
                    />
                  </div>
                  <div className="rewards-history-card-user-name">
                    {rewardHistory.user.slackUserData.real_name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rewards-history-pagination-root-container">
        <div className="rewards-history-pagination-container">
          <Pagination
            hidePrevButton
            hideNextButton
            variant="outlined"
            color="primary"
            count={Math.ceil(rewardsHistory.length / rewardsHistoryPageSize)}
            page={rewardsHistoryPageIndex}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default RewardsHistoryContainer;
