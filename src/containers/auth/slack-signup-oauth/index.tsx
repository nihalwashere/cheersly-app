import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { signupSaga } from "../state/actions";

export default function SlackSignUpOAuthContainer() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      dispatch(signupSaga({ code }, navigate));
    }
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold">Just a moment</div>

        <div className="text-xl font-normal mt-4">
          We are installing Cheersly to your Slack workspace...
        </div>

        <div className="mt-4">
          {isLoading && <Spinner loading={isLoading} />}
        </div>
      </div>
    </div>
  );
}
