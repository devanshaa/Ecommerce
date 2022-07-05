import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
export const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights {(new Date().getFullYear())} &copy; Devansh Agarwal</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/devansh9661">Instagram</a>
        <a href="https://www.linkedin.com/in/devansh-agarwal-01534a238">Linkedin</a>
        <a href="https://www.codechef.com/users/devanshag">Codechef</a>
      </div>
    </footer>
  );
};
export default Footer;
