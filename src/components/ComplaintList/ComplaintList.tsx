import ComplaintDetails from "components/ComplaintDetails/ComplaintDetails";
import ComplaintMap from "components/ComplaintMap/ComplaintMap";
import ComplaintTable from "components/ComplaintTable/ComplaintTable";
import { t } from "i18next";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ComplaintType } from "types/complaintType";

export default function ComplaintList() {
  const [show, setShow] = useState(false);
  const [complaint, setComplaint] = useState({} as ComplaintType);

  const handleComplaintClick = (complaint: ComplaintType) => {
    setComplaint(complaint);
    setShow(true);
  };

  return (
    <div className="row" style={{ margin: "10px" }}>
      <div className="col-9">
        <ComplaintTable onRowClick={handleComplaintClick} />
      </div>
      <div className="col-3" style={{ position: "fixed", right: 0 }}>
        <ComplaintMap />
      </div>
      <div>
        <Modal show={show} onHide={() => setShow(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{t("complaint_details_title")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComplaintDetails complaint={complaint} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
