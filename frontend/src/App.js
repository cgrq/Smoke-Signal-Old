import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { getAllTeamsThunk } from "./store/teams";
import Navigation from "./components/Navigation";
import UserChannels from "./components/UserChannels";
import CreateChannel from "./components/CreateChannel";
import ViewChannel from "./components/ViewChannel";
import LandingPage from "./components/LandingPage"
import ChatInterface from "./components/ChatInterface";

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
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route exact path="/staging/home">
            {
              // If user is logged in...
              user
              // display Chat Interface
              ? <ChatInterface isLoaded={isLoaded}/>

              // If they are logged out...
              // display Landing Page
              : <LandingPage />
            }
          </Route>
          <Route path="/user/channels">
            <Navigation isLoaded={isLoaded} />
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
