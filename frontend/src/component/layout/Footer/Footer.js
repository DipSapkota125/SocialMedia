import React from 'react';
import playStore from '../../../images/playStore.png';
import AppStore from '../../../images/AppStore.png';
import { NavLink } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and Ios mobile Phone</p>
                <img src={playStore} alt='playstore' />
                <img src={AppStore} alt='AppStore' />
            </div>

            <div className="midFooter">
                <h1>E-COMMERCE.</h1>
                <p>High Quality is Our first Priority</p>

                <p>Copyrights 2021 &copy;MeDipSapkota</p>
            </div>

        <div className="rightFooter">
        <h4>Follow Us</h4>
        <NavLink to="http://instagram.com/meabhisingh">Instagram</NavLink>
        <NavLink to="http://youtube.com/6packprogramemr">Youtube</NavLink>
        <NavLink to="http://instagram.com/meabhisingh">Facebook</NavLink>
      </div>
    
            
        </footer>
    )
}

export default Footer
