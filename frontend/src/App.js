import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import { getAllTeamsThunk } from "./store/teams";
import Navigation from "./components/Navigation";
import UserChannels from "./components/UserChannels";
import CreateChannel from "./components/CreateChannel";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.session);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTeamsThunk());
  }, [user]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/user/channels">
            <UserChannels />
          </Route>

          <Route path="/channels/new">
            <CreateChannel />
          </Route>

          <Route path="/channels/:id">
            <CreateChannel />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
