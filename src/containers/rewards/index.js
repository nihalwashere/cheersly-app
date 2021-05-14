import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { REWARD_SECTIONS } from "../../enums/rewardSections";
import { setSelectedSectionForRewards } from "./state/actions";
import RewardsOverviewContainer from "./overview";
import RewardsRedemptionRequestsContainer from "./redemption-requests";
import RewardsHistoryContainer from "./history";
import "./styles.css";

const RewardsContainer = (props) => {
  const { role } = props;

  const dispatch = useDispatch();

  const { selectedSection } = useSelector((state) => state.rewards);

  // const [shouldShowSnackbar, setShouldShowSnackbar] = useState(false);
  // const [snackbar, setSnackbar] = useState({ message: "", severity: "" });

  const handleSectionChange = (section) => {
    dispatch(setSelectedSectionForRewards(section));
  };

  // const handleCloseSnackbar = () => setShouldShowSnackbar(false);

  //   useEffect(() => {
  //     if (Object.keys(success).length) {
  //       setShouldShowSnackbar(true);
  //       setSnackbar(success);
  //     }
  //   }, [success]);

  //   useEffect(() => {
  //     if (Object.keys(error).length) {
  //       setShouldShowSnackbar(true);
  //       setSnackbar(error);
  //     }
  //   }, [error]);

  return (
    <div className="rewards-container">
      {/* <SnackBar
        open={shouldShowSnackbar}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      /> */}
      <div className="rewards-section-left">
        <div
          className="rewards-section-container"
          onClick={() => handleSectionChange(REWARD_SECTIONS.OVERVIEW)}
        >
          <div
            className={
              selectedSection === REWARD_SECTIONS.OVERVIEW
                ? "rewards-section-tab rewards-section-tab-selected"
                : "rewards-section-tab"
            }
          >
            {/* <div className="rewards-section-tab-image-container"> */}
            {/* <img
                src={Account_Icon}
                alt="Connected Accounts"
                className="account-section-tab-image"
              /> */}
            {/* <GitHubIcon /> */}
            {/* </div> */}
            <div className="rewards-section-tab-title-description-container">
              <div
                className={
                  selectedSection === REWARD_SECTIONS.OVERVIEW
                    ? "rewards-section-tab-title rewards-section-tab-title-selected"
                    : "rewards-section-tab-title"
                }
              >
                Overview
              </div>
              {/* <div className="rewards-section-tab-description">
                Some description
              </div> */}
            </div>
          </div>
        </div>

        <div
          className="rewards-section-container"
          onClick={() =>
            handleSectionChange(REWARD_SECTIONS.REDEMPTION_REQUESTS)
          }
        >
          <div
            className={
              selectedSection === REWARD_SECTIONS.REDEMPTION_REQUESTS
                ? "rewards-section-tab rewards-section-tab-selected"
                : "rewards-section-tab"
            }
          >
            {/* <div className="rewards-section-tab-image-container">
              <img
                src={
                  selectedSection === REWARD_SECTIONS.REDEMPTION_REQUESTS
                    ? Billing_Icon
                    : Billing_Icon
                }
                alt=""
                className="rewards-section-tab-image"
              />
            </div> */}
            <div className="rewards-section-tab-title-description-container">
              <div
                className={
                  selectedSection === REWARD_SECTIONS.REDEMPTION_REQUESTS
                    ? "rewards-section-tab-title rewards-section-tab-title-selected"
                    : "rewards-section-tab-title"
                }
              >
                Redemption Requests
              </div>
              {/* <div className="rewards-section-tab-description">
                You can setup your payment plans
              </div> */}
            </div>
          </div>
        </div>

        <div
          className="rewards-section-container"
          onClick={() => handleSectionChange(REWARD_SECTIONS.HISTORY)}
        >
          <div
            className={
              selectedSection === REWARD_SECTIONS.HISTORY
                ? "rewards-section-tab rewards-section-tab-selected"
                : "rewards-section-tab"
            }
          >
            {/* <div className="rewards-section-tab-image-container">
              <img
                src={
                  selectedSection === REWARD_SECTIONS.HISTORY
                    ? Pricing_Icon
                    : Pricing_Icon
                }
                alt=""
                className="rewards-section-tab-image"
              />
            </div> */}
            <div className="rewards-section-tab-title-description-container">
              <div
                className={
                  selectedSection === REWARD_SECTIONS.HISTORY
                    ? "rewards-section-tab-title rewards-section-tab-title-selected"
                    : "rewards-section-tab-title"
                }
              >
                History
              </div>
              {/* <div className="rewards-section-tab-description">
                You can setup your subscription plans
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="rewards-section-right">
        {selectedSection === REWARD_SECTIONS.OVERVIEW && (
          <RewardsOverviewContainer role={role} />
        )}

        {selectedSection === REWARD_SECTIONS.REDEMPTION_REQUESTS && (
          <RewardsRedemptionRequestsContainer />
        )}

        {selectedSection === REWARD_SECTIONS.HISTORY && (
          <RewardsHistoryContainer />
        )}
      </div>
    </div>
  );
};

RewardsContainer.propTypes = {
  role: PropTypes.string.isRequired,
};

export default RewardsContainer;
