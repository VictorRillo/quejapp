import React, { useEffect, useRef, useState } from "react";
import CustomCard from "components/CustomCard/CustomCard";
import { ComplaintType } from "types/complaintType";
import { useTranslation } from "react-i18next";
import "./ComplaintDetails.scss";
import { LatLngExpression, Map, marker, tileLayer } from "leaflet";

export default function ComplaintDetails({
  complaint,
}: {
  complaint: ComplaintType;
}) {
  const { t } = useTranslation();
  const [map, setMap] = useState<Map>();
  const mapInit = useRef<boolean>(false);

  const initMap = () => {
    map &&
      tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
        },
      ).addTo(map);
  };

  useEffect(() => {
    if (!mapInit.current) {
      mapInit.current = true;
      const map = new Map("map-2", {
        center: complaint.position as LatLngExpression,
        zoom: 17,
      });
      const description = `${complaint.title}</b><br>${complaint.description}<br>${complaint.address ? complaint.address : ""}`;
      marker([complaint.position[0], complaint.position[1]], {
        alt: description,
      })
        .addTo(map)
        .bindPopup(description);

      setMap(map);
    }
    if (map) {
      initMap();
    }
  }, [mapInit, map]);

  return (
    <div className="row">
      <div className="col-12 title">
        <h1>{complaint.title}</h1>
      </div>
      <div className="col-6 subtitle object-id">
        <label>#{complaint.objectId}</label>
      </div>
      <div className="col-6 subtitle date">
        <label>{new Date(complaint.createdAt).toLocaleDateString()}</label>
      </div>
      <div className="col-12">
        <CustomCard title={t("description")} content={complaint.description} />
      </div>
      <div className="col-6">
        <CustomCard title={t("status")} content={complaint.status} />
      </div>
      <div className="col-6">
        <CustomCard title={t("form_address")} content={complaint.address} />
      </div>
      <div id="map-2"></div>
    </div>
  );
}
