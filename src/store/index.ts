import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./rootReducer";
import { sagaMiddleware } from "./middleware";
import rootSaga from "./rootSaga";

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      // NOTE: enable for development
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION__ && // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = configureStore();

export default store;
