import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import Authentication from "../components/pages/Authentication";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import AdminForm from "../components/pages/AdminForm";

// AppRouter Component
export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={AdminForm} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}
