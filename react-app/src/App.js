import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import ViewAllNotebooks from "./components/ViewAllNotebooks";
import ViewSingleNotebook from "./components/ViewSingleNotebook";
import CreateNotebook from "./components/CreateNotebook";
import CreateNote from "./components/CreateNote";
import ViewAllNotes from "./components/ViewAllNotes";
import Trash from "./components/Trash";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage isLoaded={isLoaded} sessionUser={sessionUser} />
          </Route>
          <Route exact path="/home">
            <HomePage sessionUser={sessionUser} />
          </Route>
          <Route exact path="/notebooks">
            <ViewAllNotebooks sessionUser={sessionUser} />
          </Route>
          <Route path="/notebooks/new">
            <CreateNotebook sessionUser={sessionUser} />
          </Route>
          <Route exact path="/notebooks/:id">
            <ViewSingleNotebook sessionUser={sessionUser} />
          </Route>
          <Route exact path="/notes">
            <ViewAllNotes sessionUser={sessionUser} />
          </Route>
          <Route path="/notes/:id">
            <CreateNote sessionUser={sessionUser} />
          </Route>
          <Route path="/trash">
            <Trash sessionUser={sessionUser} />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
