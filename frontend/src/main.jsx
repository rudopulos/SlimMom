import "normalize.css";
import "./App.css";
import "./styles/home.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import initializeAxiosAuthHeader from "./Redux/token/token";
import App from "./App";

initializeAxiosAuthHeader();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
