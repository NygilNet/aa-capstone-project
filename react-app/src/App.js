import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Footer from "./components/Footer";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import ViewAllNotebooks from "./components/ViewAllNotebooks";
import ViewSingleNotebook from "./components/ViewSingleNotebook";
import CreateNotebook from "./components/CreateNotebook";
import NotesPage from "./components/ViewAllNotes";
import Trash from "./components/Trash";
import ViewTags from "./components/Tags";
import NotFound from "./components/404Page";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);
  const tags = useSelector(state => state.tags);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            { sessionUser ? <Redirect to="/home" /> : <SplashPage isLoaded={isLoaded} /> }
          </Route>
          <Route exact path="/home">
            { sessionUser ? <HomePage sessionUser={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notebooks">
            { sessionUser ? <ViewAllNotebooks /> : <Redirect to="/" />}
          </Route>
          <Route path="/notebooks/new">
            { sessionUser ? <CreateNotebook /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notebooks/:id">
            { sessionUser ? <ViewSingleNotebook user={sessionUser} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/notes">
          { sessionUser ? <NotesPage tags={tags} /> : <Redirect to="/" />}
          </Route>
          <Route path="/trash">
          { sessionUser ? <Trash /> : <Redirect to="/" />}
          </Route>
          <Route path="/tags">
            { sessionUser ? <ViewTags user={sessionUser} tags={tags} /> : <Redirect to="/" /> }
          </Route>
          <Route><NotFound /></Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
