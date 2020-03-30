import React from 'react';


const Sidebar = () => {
    return (
        <div id="sidebar">
            <div id="left" className="column">
                <div className="top-left">Add Book</div>
                <div className="bottom">Remove Book</div>
                <div className="bottom">Update Book</div>
                <div className="bottom">List all Books</div>
            </div>
            <div id="right" className="column">
                <div className="top-right"></div>
                <div className="bottom"></div>
            </div>
        </div>
    )
}


export default Sidebar;