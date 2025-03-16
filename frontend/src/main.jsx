import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loading from "./components/commen/Loading";

let persistor = persistStore(store);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading color="#000" />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
