import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNotebooks } from "../../store/notebook";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./index.css"

function SplashPage({ isLoaded }) {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetNotebooks());
    }, [dispatch])

    const handleNotebooks = (e) => {
        e.preventDefault();
        return history.push('/notebooks');
    }

    const handleNotes = (e) => {
        e.preventDefault();
        return history.push('/notes');
    }

    const handleTrash = (e) => {
        e.preventDefault();
        return history.push('/trash');
    }

    return (
        <div className="splash-page-container">
            <div className="splash-page-header">
                <NavLink to="/">MindPalace</NavLink>
                {isLoaded && (
                    <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                    />
                )}
            </div>
            <div className="splash-page-title">
                <h1>Tame your work, organize your life</h1>
                <p id="splash-page-subtitle">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
            </div>
            <div className="splash-page-actions">
                    <OpenModalButton
                    buttonText="Sign up for free"
                    modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                    buttonText="Already have an account? Log in"
                    modalComponent={<LoginFormModal />}
                     />
            </div>
        </div>
    )

}

export default SplashPage;
