import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="pv4 ph3 ph5-m ph6-l mid-gray bg-black">
            <small className="f6 db tc">© 2020 <b className="ttu"> Tiger Softwares Inc</b>., All Rights Reserved</small>
            <div className="tc mt3">
                <a href="/language/" title="Language" className="f6 dib ph2 link mid-gray dim">Language</a>
                <a href="/terms/" title="Terms" className="f6 dib ph2 link mid-gray dim">Terms of Use</a>
                <a href="/privacy/" title="Privacy" className="f6 dib ph2 link mid-gray dim">Privacy</a>
            </div>
        </footer>
    )
}


export default Footer;