import React from 'react';


const SearchBox = ({ placeholder, handleSearch }) => {
    return (
        <div>
            <input type="text" className="pa2 br3 mb3 input-reset ba bg-transparent hover-bg-black hover-white w-50" placeholder={placeholder} onChange={handleSearch} />
        </div>
    )
}


export default SearchBox;