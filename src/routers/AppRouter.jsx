import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import Authentication from "../components/pages/Authentication";

// AppRouter Component
export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/login" component={Authentication} />
          <Route exact path="/register" component={Authentication} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}
