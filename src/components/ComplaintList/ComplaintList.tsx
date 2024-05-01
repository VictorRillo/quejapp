import ComplaintMap from "components/ComplaintMap/ComplaintMap";
import ComplaintTable from "components/ComplaintTable/ComplaintTable";
import React from "react";

export default function ComplaintList() {
  return (
    <div className="row" style={{ margin: "10px"}}>
      <div className="col-9">
        <ComplaintTable />
      </div>
      <div className="col-3" style={{ position: "fixed", right: 0 }}>
        <ComplaintMap />
      </div>
    </div>
  );
}
