import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import "./index.css";

function HomePage({ sessionUser }) {

    const history = useHistory();
    const date = new Date().toString();

    // if (!sessionUser) return null;

    return (
        <div className="display-page">
            <Navigation />
            <div className="home-page-container">
                <h1>Welcome, {sessionUser.username}</h1>
                <h2>{date}</h2>
            </div>
        </div>
    );

}

export default HomePage;
