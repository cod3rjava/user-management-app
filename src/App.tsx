import React from "react";
import { Route, Switch } from "wouter";
import UserListPage from "./pages/userListPage/UserListPage.tsx";
import UserDetailsPage from "./pages/userDetailsPage/UserDetailsPage.tsx";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={UserListPage} />
        <Route path="/users/:id" component={UserDetailsPage} />
      </Switch>
    </>
  );
};

export default App;