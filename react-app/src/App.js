import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import ViewAllNotebooks from "./components/ViewAllNotebooks";
import ViewSingleNotebook from "./components/ViewSingleNotebook";
import CreateNotebook from "./components/CreateNotebook";
import CreateNote from "./components/CreateNote";
import Trash from "./components/Trash";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/notebooks">
            <ViewAllNotebooks />
          </Route>
          <Route path="/notebooks/new">
            <CreateNotebook />
          </Route>
          <Route exact path="/notebooks/:id">
            <ViewSingleNotebook />
          </Route>
          <Route path="/notebooks/:id/new">
            <CreateNote />
          </Route>
          <Route path="/trash">
            <Trash />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
