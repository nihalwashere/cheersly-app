import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GitHubIcon from "@mui/icons-material/GitHub";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
// import { Account_Icon, Logout_Icon } from "../../assets/images";
import { ACCOUNT_SECTIONS } from "../../enums/accountSections";
import { setSelectedSectionForAccount } from "./state/actions";
import { logoutSagaAction } from "../auth/state/actions"; // auth actions
import { NAVIGATION_SECTION } from "../../enums/navigationRoutes";
import { setSelectedNavSectionAction } from "../routes/state/actions";
import ProfileContainer from "./profile";
import "./styles.css";

const AccountContainer = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const { selectedSection, isLoading } = useSelector((state) => state.account);

  // const [shouldShowSnackbar, setShouldShowSnackbar] = useState(false);
  // const [snackbar, setSnackbar] = useState({ message: "", severity: "" });

  const handleSectionChange = (section) => {
    dispatch(setSelectedSectionForAccount(section));

    if (section !== NAVIGATION_SECTION.HELP) {
      dispatch(setSelectedNavSectionAction(NAVIGATION_SECTION.PROFILE_SIDEBAR));
    }

    if (section === NAVIGATION_SECTION.HELP) {
      dispatch(setSelectedNavSectionAction(NAVIGATION_SECTION.HELP));
    }

    if (section === ACCOUNT_SECTIONS.LOGOUT) {
      dispatch(logoutSagaAction(history));
    }
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
    <div className="account-container">
      {/* <SnackBar
        open={shouldShowSnackbar}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      /> */}

      <div className="account-section-left">
        <div
          className="account-section-container"
          onClick={() => handleSectionChange(ACCOUNT_SECTIONS.PROFILE)}
        >
          <div
            className={
              selectedSection === ACCOUNT_SECTIONS.PROFILE
                ? "account-section-tab account-section-tab-selected"
                : "account-section-tab"
            }
          >
            <div className="account-section-tab-image-container">
              {/* <img
                src={Account_Icon}
                alt="Connected Accounts"
                className="account-section-tab-image"
              /> */}
              <GitHubIcon />
            </div>
            <div className="account-section-tab-title-description-container">
              <div
                className={
                  selectedSection === ACCOUNT_SECTIONS.PROFILE
                    ? "account-section-tab-title account-section-tab-title-selected"
                    : "account-section-tab-title"
                }
              >
                Profile
              </div>
              {/* <div className="account-section-tab-description">
                Some description
              </div> */}
            </div>
          </div>
        </div>

        {/* <div
          className="account-section-container"
          onClick={() => handleSectionChange(ACCOUNT_SECTIONS.BILLING)}
        >
          <div
            className={
              selectedSection === ACCOUNT_SECTIONS.BILLING
                ? "account-section-tab account-section-tab-selected"
                : "account-section-tab"
            }
          >
            <div className="account-section-tab-image-container">
              <img
                src={
                  selectedSection === ACCOUNT_SECTIONS.BILLING
                    ? Billing_Icon
                    : Billing_Icon
                }
                alt="Billing"
                className="account-section-tab-image"
              />
            </div>
            <div className="account-section-tab-title-description-container">
              <div className="account-section-tab-title">Billing</div>
              <div className="account-section-tab-description">
                You can setup your payment plans
              </div>
            </div>
          </div>
        </div>

        <div
          className="account-section-container"
          onClick={() => handleSectionChange(ACCOUNT_SECTIONS.PRICING)}
        >
          <div
            className={
              selectedSection === ACCOUNT_SECTIONS.PRICING
                ? "account-section-tab account-section-tab-selected"
                : "account-section-tab"
            }
          >
            <div className="account-section-tab-image-container">
              <img
                src={
                  selectedSection === ACCOUNT_SECTIONS.PRICING
                    ? Pricing_Icon
                    : Pricing_Icon
                }
                alt="Pricing"
                className="account-section-tab-image"
              />
            </div>
            <div className="account-section-tab-title-description-container">
              <div className="account-section-tab-title">Pricing</div>
              <div className="account-section-tab-description">
                You can setup your subscription plans
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="account-section-bottom-container">
          <div
            className="account-section-container"
            onClick={() => handleSectionChange(ACCOUNT_SECTIONS.LOGOUT)}
          >
            <div
              className={
                selectedSection === ACCOUNT_SECTIONS.LOGOUT
                  ? "account-section-tab account-section-tab-selected"
                  : "account-section-tab"
              }
            >
              <div className="account-section-tab-image-container">
                <img
                  src={Logout_Icon}
                  alt="Logout"
                  className="account-section-tab-image"
                />
              </div>
              <div className="account-section-tab-title-description-container">
                <div className="account-section-bottom-tab-title">Logout</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {isLoading ? (
        <div className="account-section-right account-loader">
          <Spinner />
        </div>
      ) : (
        <div className="account-section-right">
          {selectedSection === ACCOUNT_SECTIONS.PROFILE && <ProfileContainer />}
          {/* {selectedSection === ACCOUNT_SECTIONS.BILLING && <BillingContainer />}
          {selectedSection === ACCOUNT_SECTIONS.PRICING && <PricingContainer />} */}
          {/* {selectedSection === ACCOUNT_SECTIONS.HELP && <HelpContainer />} */}
        </div>
      )}
    </div>
  );
};

AccountContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AccountContainer;
