import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import GiftCard from "../../components/GiftCard";
import { setMessage, getCatalogsSaga } from "./state/actions";

export default function Redeem() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, message, catalogs } = useSelector(
    (state: any) => state.redeem
  );

  const { user } = useSelector((state: any) => state.auth);

  const handleBrandSelect = (brandKey: string) => {
    navigate(`/redeem/gift-cards/${brandKey}`);
  };

  useEffect(() => {
    dispatch(getCatalogsSaga({ country: user?.country }));
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-semibold">Gift cards</div>

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

          {!user?.country && (
            <div className="text-base">
              You have not selected your residential country, until you do that
              you cannot view gift cards.
            </div>
          )}

          {user?.country && (
            <div>
              <div className="mt-2 mb-2">
                <span className="text-base">Your country:</span>{" "}
                <span className="font-semibold">{user.country}</span>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-10">
                {catalogs.brands.map((brand: any) => (
                  <GiftCard
                    key={brand.brandKey}
                    brandName={brand.brandName}
                    brandImageUrl={brand.imageUrls["300w-326ppi"]}
                    onClick={() => handleBrandSelect(brand.brandKey)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-20">
            <hr />

            <div className="mt-4 text-xs text-gray-400">
              The merchants represented are not sponsors of the rewards or
              otherwise affiliated with Cheersly Inc. The logos and other
              identifying marks attached are trademarks of and owned by each
              represented company and/or its affiliates. Please visit each
              company&apos;s website for additional terms and conditions.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
