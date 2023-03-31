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
                <img
                className="home-page-image"
                src="https://images.unsplash.com/photo-1615884241431-d07c87e30ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt="Stock image of bookshelf - Beazy on Unsplash"
                />
            </div>
        </div>
    );

}

export default HomePage;
