import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import theme from "./mui";
import RoutesContainer from "./containers/routes";
// import { validateTokenSaga } from "./containers/login/state/actions";
import { CHEERSLY_TOKEN } from "./utils/constants";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem(CHEERSLY_TOKEN)) {
      // store.dispatch(validateTokenSagaAction());
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RoutesContainer />
      </ThemeProvider>
    </Provider>
  );
}
