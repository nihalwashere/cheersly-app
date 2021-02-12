import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { authorizeSagaAction } from "./state/actions";
import "./styles.css";

const AuthContainer = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  const {
    location: { search },
  } = history;

  useEffect(() => {
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
      <CircularProgress />
    </div>
  );
};

AuthContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AuthContainer;
