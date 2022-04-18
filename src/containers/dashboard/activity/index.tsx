import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { getTeamActivitySaga } from "../state/actions";

export default function Activity() {
  const dispatch = useDispatch();

  const { isLoading, activity } = useSelector((state: any) => state.dashboard);

  useEffect(() => {
    dispatch(getTeamActivitySaga({ pageIndex: 0, pageSize: 100 }));
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-semibold">Activity</div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="w-full">
          {activity.map((elem: any) => (
            <div key={elem._id} className="p-4 flex items-center mt-4 card">
              <div>
                <div className="text-sm">
                  <b className="slack-member">@{elem.data.senderName}</b> shared
                  some cheers for {elem.data.points} points with{" "}
                  {elem.data.recipients.map((recipient: any) => (
                    <b key={recipient.id} className="slack-member mr-2">
                      @{recipient.name}
                    </b>
                  ))}
                </div>

                <div className="text-xs mt-2">{elem.data.reason}</div>

                {!!elem.data.companyValues.length && (
                  <div className="mt-2">
                    {elem.data.companyValues.map((companyValue: any) => (
                      <span
                        key={companyValue}
                        className="text-xs slack-code-block slack-code mr-2"
                      >
                        {companyValue}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
