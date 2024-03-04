import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu">
        <a className="menu-item" href="#">
          {t("complaint_list")}
        </a>
        <a className="menu-item" href="#">
          {t("add_complaint")}
        </a>
      </div>
      <button className="login-icon" aria-label={t('login')}>
        <FontAwesomeIcon icon={faUser} size="2x" />
      </button>
    </div>
  );
};

export default Header;
