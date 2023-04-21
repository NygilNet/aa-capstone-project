import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import OpenModalButton from "../OpenModalButton";
import CreateNewTag from "./CreateNewTag";
import DeleteTag from "./DeleteTag";
import "./index.css";



function ViewTags({ user, tags }) {

    const tagList = Object.values(tags)

    tagList.sort((a, b) => {
            const nameA = a.tagName.toUpperCase();
            const nameB = b.tagName.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

    const handleClick = e => {
        e.preventDefault();
        return alert('Filter/Sort Tags coming soon');
    }

    return (
        <div className="display-page">
            <Navigation />
            <div className="tags-container">
                <div className="tags-header">
                    <h1><i class="fa-solid fa-tags"></i> Tags</h1>
                </div>
                <div className="tags-action-buttons">
                    <OpenModalButton
                    modalComponent={<CreateNewTag userId={user.id} />}
                    buttonText="New Tag"
                    nameClass="tags-action-btn curs"
                    />
                </div>
                <div className="view-tags">
                { tagList[0] ? (tagList?.map(tag => (
                        <div
                        key = {tag.id}
                        className="view-tags-tag"
                        >
                            <p className="curs" onClick={handleClick}>{tag.tagName} ({tag.notes.length})</p>
                            <OpenModalButton
                            modalComponent={<DeleteTag tagId={tag.id} />}
                            buttonText="Delete"
                            nameClass="tag-delete-btn curs"
                            />
                        </div>
                    ))) : <p className="view-tags-no-tag">You have no tags! You can create one by clicking the new tag button.</p> }

                </div>
            </div>
        </div>
    )
}

export default ViewTags;
