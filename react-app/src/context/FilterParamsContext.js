import { createContext, useState, useContext } from "react";

export const FilterParamsContext = createContext();
export const useFilterParams = () => useContext(FilterParamsContext);

function FilterParamsProvider(props) {

    const [filterParams, setFilterParams] = useState("All");

    return (
        <FilterParamsContext.Provider value={{filterParams, setFilterParams}}>
            {props.children}
        </FilterParamsContext.Provider>
    )

}

export default FilterParamsProvider;
