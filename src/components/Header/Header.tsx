import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFont,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import ComplaintForm from "components/ComplaintForm/ComplaintForm";
import { CUSTOM_EVENT } from "enums/CustomEvent";
import Register from "components/Register/Register";
import { Toaster } from "react-hot-toast";
import i18n from "i18next";

export enum MODAL_SECTION {
  ADD = "ADD",
  USER = "USER",
}

const Header = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState<MODAL_SECTION>();

  const hideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    window.addEventListener(CUSTOM_EVENT.CLOSE_HEADER_MODAL, hideModal);

    return () => {
      window.removeEventListener(CUSTOM_EVENT.CLOSE_HEADER_MODAL, hideModal);
    };
  }, []);

  const handleAddComplaint = () => {
    setModal(MODAL_SECTION.ADD);
    setShow(true);
  };

  const handleUserModal = () => {
    setModal(MODAL_SECTION.USER);
    setShow(true);
  };

  const handleCloseSession = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("cookie");
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  const isLogged = !!sessionStorage.getItem("isLoggedIn");

  const handleChangeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 1);
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </div>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="menu">
          <a className="menu-item" href="#">
            {t("complaint_list")}
          </a>
          <button className="add-complaint-button" onClick={handleAddComplaint}>
            {t("add_complaint")}
          </button>
        </div>
        <div>
          <button
            aria-label={t("increase_font_size")}
            onClick={increaseFontSize}
            className="increase-size-button"
          >
            <FontAwesomeIcon icon={faFont} />
          </button>
          <button
            aria-label={t("decrease_font_size")}
            onClick={decreaseFontSize}
            className="decrease-size-button"
          >
            <FontAwesomeIcon icon={faFont} />
          </button>
          <select className="language-select" onChange={handleChangeLanguage}>
            <option value="es">Español</option>
            <option value="gl">Galego</option>
            <option value="en">English</option>
          </select>
          {!isLogged ? (
            <button
              className="login-icon"
              aria-label={t("login")}
              onClick={handleUserModal}
            >
              <FontAwesomeIcon icon={faUser} size="2x" />
            </button>
          ) : (
            <button
              className="login-icon"
              aria-label={t("close_session")}
              onClick={handleCloseSession}
            >
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            </button>
          )}
        </div>
      </div>
      <div>
        <Modal show={show} onHide={() => setShow(false)} centered>
          {modal === MODAL_SECTION.USER && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{t("user_title")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Register />
              </Modal.Body>
            </>
          )}
          {modal === MODAL_SECTION.ADD && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{t("add_complaint_title")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ComplaintForm />
              </Modal.Body>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Header;
