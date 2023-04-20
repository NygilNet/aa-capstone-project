import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetNotebooks } from "../../store/notebook";
import { resetNotes } from "../../store/note";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./index.css"

function SplashPage({ isLoaded }) {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const func = async () => {
            await dispatch(resetNotes());
            await dispatch(resetNotebooks());
        }
        func()
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
        <div className="container">

        <div className="splash-page-container">
            <div className="splash-page-header">
                <NavLink to="/">
                    <img
                    className="splash-header-logo"
                    alt="MindPalace"
                    src="https://i.imgur.com/19eLshm.png"
                    />
                </NavLink>
                {isLoaded && (
                    <OpenModalButton
                    buttonText="Log In"
                    nameClass="splash-header-login curs"
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
                    nameClass="splash-page-action-signup curs"
                    buttonText="Sign up for free"
                    modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                    nameClass="splash-page-action-login curs"
                    buttonText="Already have an account? Log in"
                    modalComponent={<LoginFormModal />}
                     />
            </div>
            <div>
                <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Stock image of laptop and notes - Andrew Neel on unsplash"
                />
            </div>
        </div>
        </div>
    )

}

export default SplashPage;
