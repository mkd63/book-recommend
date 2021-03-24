import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import Authentication from "../components/pages/Authentication";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import AdminForm from "../components/pages/AdminForm";
import AdminAccess from "../components/pages/AdminAccess";

// AppRouter Component
export default function AppRouter() {
  return (
    <BrowserRouter basename="/">
      <GlobalProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/admin" component={AdminForm} />
          <Route exact path="/admin-access" component={AdminAccess} />
          <Route path="/" component={Authentication} />
        </Switch>
      </GlobalProvider>
    </BrowserRouter>
  );
}
