import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu">
        <a className="menu-item" href="#">
          Listado
        </a>
        <a className="menu-item" href="#">
          Añadir queja
        </a>
      </div>
      <FontAwesomeIcon icon={faUser} className="login-icon" size="2x"/>
    </div>
  );
};

export default Header;
