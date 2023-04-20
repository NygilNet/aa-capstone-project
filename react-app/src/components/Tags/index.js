import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateNewTag from "./CreateNewTag";
import "./index.css";



function ViewTags({ tags }) {

    console.log(tags)
    const tagList = Object.values(tags)

    tagList.sort((a, b) => {
            const nameA = a.tagName.toUpperCase();
            const nameB = b.tagName.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

    return (
        <div className="tags-container">
            <div className="tags-header">
                <h1><i class="fa-solid fa-tags"></i> Tags</h1>
            </div>
            <div className="tags-action-buttons">
                <OpenModalButton
                modalComponent={<CreateNewTag />}
                buttonText="New Tag"
                nameClass="tags-action-btn curs"
                />
            </div>
            <div className="view-tags">
                {tagList?.map(tag => (
                    <div
                    key = {tag.id}
                    className="view-tags-tag curs"
                    >
                        <p>{tag.tagName} ({tag.notes.length})</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewTags;
