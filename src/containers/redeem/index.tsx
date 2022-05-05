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

  const { settings } = useSelector((state: any) => state.settings);

  const { user } = useSelector((state: any) => state.auth);

  const handleBrandSelect = (brandKey: string) => {
    navigate(`/redeem/gift-cards/${brandKey}`);
  };

  useEffect(() => {
    if (user?.country) {
      dispatch(getCatalogsSaga({ country: user.country }));
    }
  }, [user]);

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

      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Gift cards</div>
        {user?.country && (
          <div className="mt-2 mb-2">
            <span className="text-base">Your country:</span>{" "}
            <span className="font-semibold">{user.country}</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : !settings?.enableGiftCards ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <span className="text-lg font-semibold">No rewards yet!</span>
          <span>
            Your team hasn&apos;t setup any rewards yet, check back soon!
          </span>
        </div>
      ) : (
        <div className="w-full">
          {!user?.country && (
            <div className="flex flex-col justify-center items-center mt-20">
              <span>
                You have not selected your country, until you do that you cannot
                view gift cards.
              </span>
              <span>
                You can select your country from the bottom left menu by
                clicking on your avatar.
              </span>
            </div>
          )}

          {user?.country && (
            <div className="grid grid-cols-4 gap-4 mt-10">
              {catalogs.brands.map((brand: any) => (
                <div className="mt-5">
                  <GiftCard
                    key={brand.brandKey}
                    brandName={brand.brandName}
                    brandImageUrl={brand.imageUrls["300w-326ppi"]}
                    onClick={() => handleBrandSelect(brand.brandKey)}
                  />
                </div>
              ))}
            </div>
          )}

          {user?.country && (
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
          )}
        </div>
      )}
    </div>
  );
}
