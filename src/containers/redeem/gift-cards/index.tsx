import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MenuItem from "@mui/material/MenuItem";
import Select from "../../../components/Select";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import ErrorMessage from "../../../components/ErrorMessage";
import ConfirmOrderDialog from "./ConfirmOrderDialog";
import {
  setMessage,
  getBrandSaga,
  placeGiftCardOrderSaga,
  getExchangeRateSaga,
} from "../state/actions";
import { useMergeState } from "../../../utils/custom-hooks";
import { getPointsInRewardCurrency } from "../../../utils/common";
import { DEFAULT_BASE_CURRENCY, VALUE_TYPE } from "../../../utils/constants";

export default function GiftCards() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { brandKey } = useParams();

  const { teamPointBalance, userPointBalance } = useSelector(
    (state: any) => state.global
  );

  const { isLoading, message, brand, exchangeRate } = useSelector(
    (state: any) => state.redeem
  );

  const { user } = useSelector((state: any) => state.auth);

  const [state, setState] = useMergeState({
    items: [],
    valueType: "",
    currencyCode: "",
    selectedItem: null,
    selectedUtid: "",
    selectedFaceValue: "",
    minFaceValue: null,
    maxFaceValue: null,
    shouldShowConfirmOrderDialog: false,
    errors: {},
  });

  const getPoints = () => {
    if (state.valueType === VALUE_TYPE.FIXED_VALUE) {
      return getPointsInRewardCurrency(
        state.selectedItem.faceValue,
        state.selectedItem.currencyCode,
        exchangeRate.baseFx
      );
    }

    if (state.valueType === VALUE_TYPE.VARIABLE_VALUE) {
      return getPointsInRewardCurrency(
        state.selectedFaceValue,
        state.selectedItem.currencyCode,
        exchangeRate.baseFx
      );
    }

    return 0;
  };

  const points = getPoints();

  const handleChangeItem = (event: any) => {
    setState({
      [event.target.name]: event.target.value,
      selectedItem: state.items.find(
        (elem: any) => elem.utid === event.target.value
      ),
      errors: {
        [event.target.name]: false,
      },
    });
  };

  const shouldDisableRedeem = () => {
    if (teamPointBalance < points) {
      return true;
    }

    if (userPointBalance < points) {
      return true;
    }

    if (!Object.keys(state.errors).length) {
      return false;
    }

    if (Object.values(state.errors).some((elem) => elem)) {
      return true;
    }
  };

  const handleOpenShouldShowConfirmOrderDialog = () => {
    setState({ shouldShowConfirmOrderDialog: true });
  };

  const handleCloseShouldShowConfirmOrderDialog = () => {
    setState({ shouldShowConfirmOrderDialog: false });
  };

  const wrapRewardData = () => ({
    recipientName: user?.profile?.realName,
    recipientEmail: user?.profile?.email,
    selectedItem: state.selectedItem,
    valueType: state.valueType,
    selectedFaceValue: state.selectedFaceValue,
    points,
  });

  const handleChangeFaceValue = (event: any) => {
    let errors = {};

    if (event.target.value < state.minFaceValue) {
      errors = {
        [event.target
          .name]: `Gift card must be atleast ${state.minFaceValue} ${state.currencyCode}`,
      };
    }

    if (event.target.value > state.maxFaceValue) {
      errors = {
        [event.target
          .name]: `Gift card can't be more than ${state.maxFaceValue} ${state.currencyCode}`,
      };
    }

    setState({
      [event.target.name]: event.target.value,
      errors,
    });
  };

  const handleRedeemReward = (data: any) => {
    const payload = {
      points,
      amount:
        state.valueType === VALUE_TYPE.FIXED_VALUE
          ? Number(state.selectedItem.faceValue)
          : Number(state.selectedFaceValue),
      recipient: { email: data.recipientEmail, firstName: data.recipientName },
      utid: state.selectedItem.utid,
    };

    dispatch(placeGiftCardOrderSaga(payload));

    handleCloseShouldShowConfirmOrderDialog();
  };

  useEffect(() => {
    if (brandKey) {
      dispatch(getBrandSaga({ brandKey }));
    }
  }, []);

  useEffect(() => {
    if (brand.items && brand.items.length) {
      let valueType = "";

      if (brand.items.length === 1) {
        valueType = VALUE_TYPE.VARIABLE_VALUE; // Text field
      } else {
        valueType = VALUE_TYPE.FIXED_VALUE; // Select field
      }

      let payload: any = {
        valueType,
        items: brand.items.sort((a: any, b: any) => a.faceValue - b.faceValue),
        selectedItem: brand.items[0],
        selectedUtid: brand.items[0].utid,
      };

      if (valueType === VALUE_TYPE.VARIABLE_VALUE) {
        payload = {
          ...payload,
          selectedFaceValue: brand.items[0].minValue,
          minFaceValue: brand.items[0].minValue,
          maxFaceValue: brand.items[0].maxValue,
          currencyCode: brand.items[0].currencyCode,
        };
      }

      setState({ ...payload });

      if (payload.selectedItem.currencyCode !== DEFAULT_BASE_CURRENCY) {
        dispatch(
          getExchangeRateSaga({
            rewardCurrency: payload.selectedItem.currencyCode,
            baseCurrency: DEFAULT_BASE_CURRENCY,
          })
        );
      }
    }
  }, [brand]);

  return (
    <div>
      <div className="w-full">
        <div className="text-xl mt-4">
          <Breadcrumbs separator=">">
            <div
              onClick={() => navigate(-1)}
              className="text-base underline cursor-pointer"
            >
              Gift cards
            </div>
          </Breadcrumbs>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner loading={isLoading} />
          </div>
        ) : (
          <div className="w-full">
            {message?.type && (
              <Alert
                severity={message.type}
                message={message.value}
                open={Object.keys(message).length ? true : false}
                onClose={() => dispatch(setMessage({}))}
              />
            )}

            {brand?.brandKey && (
              <div className="mt-5">
                <div className="text-2xl font-semibold mb-2">
                  {brand.brandName}
                </div>

                <div className="flex">
                  <img
                    src={brand.imageUrls["300w-326ppi"]}
                    alt={brand.brandKey}
                  />

                  <div className="ml-10 flex flex-col w-2/5">
                    <span className="text-lg">Redeem your points</span>

                    <div className="mt-2 mb-10">
                      {state.items.length > 1 ? (
                        <Select
                          fullWidth
                          variant="outlined"
                          name="selectedUtid"
                          value={state.selectedUtid}
                          onChange={handleChangeItem}
                        >
                          {state.items.map((item: any) => (
                            <MenuItem key={item.utid} value={item.utid}>
                              {item.currencyCode} {item.faceValue} gift card for{" "}
                              {getPointsInRewardCurrency(
                                item.faceValue,
                                item.currencyCode,
                                exchangeRate.baseFx
                              )}{" "}
                              points
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <div className="flex items-center">
                          <TextField
                            fullWidth
                            variant="outlined"
                            name="selectedFaceValue"
                            value={state.selectedFaceValue}
                            onChange={handleChangeFaceValue}
                            required
                            error={!!state?.errors?.selectedFaceValue}
                          />

                          <span className="ml-2 font-semibold">
                            {state.currencyCode}
                          </span>
                        </div>
                      )}

                      {state?.errors?.selectedFaceValue && (
                        <ErrorMessage
                          message={state?.errors?.selectedFaceValue}
                        />
                      )}
                    </div>

                    <Button
                      label={`Redeem for ${points} points`}
                      onClick={handleOpenShouldShowConfirmOrderDialog}
                      disabled={shouldDisableRedeem()}
                    />

                    <span className="text-xs font-semibold text-red-600 mt-2">
                      {teamPointBalance < points && userPointBalance < points
                        ? "Your team and you do not have sufficient point balance"
                        : teamPointBalance < points
                        ? "Your team does not have sufficient point balance"
                        : userPointBalance < points
                        ? "You do not have sufficient point balance"
                        : ""}
                    </span>
                  </div>
                </div>

                <div
                  className="mt-4" // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: brand.shortDescription }}
                />

                <div className="mt-20">
                  <hr />
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  <div
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: brand.terms }}
                  />

                  <div
                    className="mt-4" // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: brand.disclaimer }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {state.shouldShowConfirmOrderDialog && (
        <ConfirmOrderDialog
          open={state.shouldShowConfirmOrderDialog}
          onClose={handleCloseShouldShowConfirmOrderDialog}
          onSave={handleRedeemReward}
          data={wrapRewardData()}
        />
      )}
    </div>
  );
}
