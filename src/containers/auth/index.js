import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import { authorizeSagaAction } from "./state/actions";
import "./styles.css";

const AuthContainer = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  const {
    location: { search },
  } = history;

  useEffect(() => {
    if (String(search).includes("error")) {
      history.push("/login");
    }

    const codeAndState = search.split("=")[1];

    if (codeAndState) {
      const code = codeAndState.split("&")[0];

      if (code) {
        dispatch(authorizeSagaAction({ code }, history));
      } else {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="auth-container">
      <Spinner />
    </div>
  );
};

AuthContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AuthContainer;
