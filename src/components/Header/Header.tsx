import React, { useState } from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import ComplaintForm from "components/ComplaintForm/ComplaintForm";
import { CUSTOM_EVENT } from "enums/CustomEvent";

const Header = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  document.addEventListener(CUSTOM_EVENT.CLOSE_MODAL, () => setShow(false));

  return (
    <>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="menu">
          <a className="menu-item" href="#">
            {t("complaint_list")}
          </a>
          <button
            className="add-complaint-button"
            onClick={() => setShow(true)}
          >
            {t("add_complaint")}
          </button>
        </div>
        <button className="login-icon" aria-label={t("login")}>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </button>
      </div>
      <div>
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("add_complaint_title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComplaintForm />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Header;
