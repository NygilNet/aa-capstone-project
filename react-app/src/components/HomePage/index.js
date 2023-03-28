import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navigation from "../Navigation";

function HomePage() {

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return null;

    return (
        <div className="display-page">
            <Navigation />
            <div className="home-page-container">
                hello from home page
            </div>
        </div>
    );

}

export default HomePage;
