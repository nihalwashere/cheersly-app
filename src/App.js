import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import RootContainer from "./containers/root";
import { validateTokenSagaAction } from "./containers/auth/state/actions";
import { CHEERSLY_TOKEN } from "./utils/constants";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem(CHEERSLY_TOKEN)) {
      store.dispatch(validateTokenSagaAction());
    }
  }, []);

  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
