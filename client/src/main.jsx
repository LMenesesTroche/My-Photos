import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <PayPalScriptProvider
        options={{
          "client-id":"AYEW8Eb8fhI-2xC-myOv0dn5l2Y_n9jBMbgj65BbXr8VGKTlBMFpovi5ds_u8CRI0ZXnYI6r6pvbrNph"// Este es el id del vendedor falso
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
