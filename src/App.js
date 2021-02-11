import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import RootContainer from "./containers/root";

// if (localStorage.getItem(CODEKICKBOT_TOKEN)) {
//   store.dispatch(validateTokenSagaAction());
// }

const App = () => {
  return <RootContainer />;
};

export default App;
