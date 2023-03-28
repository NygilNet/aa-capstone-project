import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
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
            { sessionUser ? <Redirect to="/home" /> : <SplashPage isLoaded={isLoaded} sessionUser={sessionUser} /> }
          </Route>
          <Route exact path="/home">
            { sessionUser ? <HomePage sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notebooks">
            { sessionUser ? <ViewAllNotebooks sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route path="/notebooks/new">
            { sessionUser ? <CreateNotebook sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notebooks/:id">
            { sessionUser ? <ViewSingleNotebook sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notes">
          { sessionUser ? <ViewAllNotes sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route path="/notes/:id">
          { sessionUser ? <CreateNote sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route path="/trash">
          { sessionUser ? <Trash sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
