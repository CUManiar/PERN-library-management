import React from 'react';

const Navigation = ({ onRouteChange, isUserLoggedIn, user }) => {
    return (
        isUserLoggedIn
            ?
            <div>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }} className="bg-black ">
                    <p onClick={() => onRouteChange('sign-in')} className="f3 link  white  underline pa3 mr3 grow pointer"> Sign Out </p>
                </nav>
                <p className="f3 i tc ma0 pa3 ">  {`Hey ${user}`} </p>
            </div>
            :
            <div >
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }} className="bg-black " >
                    <p onClick={() => onRouteChange('sign-in')} className="f3 link grow mr3 white underline pa3 pointer"> Sign In </p>
                </nav>
            </div>
    )
}

export default Navigation;