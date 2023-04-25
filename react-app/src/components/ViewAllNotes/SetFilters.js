import React, { useState } from "react";
import { useModal } from "../../context/Modal";

function SetFilters () {

    const { closeModal } = useModal();

    return (
        <div className="set-filters-modal">
            <h2>Add Filters</h2>
        </div>
    )

}

export default SetFilters;
