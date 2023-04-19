import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

function NotFound() {

    return (
        <div className="fourofourpage">
            <div className="splash-page-header">
                <NavLink to="/">
                    <img
                    className="splash-header-logo"
                    alt="MindPalace"
                    src="https://i.imgur.com/19eLshm.png"
                    />
                </NavLink>
            </div>
            <div className="not-found-content">
                <img
                className="not-found-content-img"
                alt="404 image from Romson Preechawit on Unsplash"
                src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                />
                <div className="not-found-text">
                    <h1>This door does not have a key.</h1>
                    <p>The requested page can not be found.</p>
                </div>

            </div>
        </div>
    )

}

export default NotFound;
