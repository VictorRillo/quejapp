import React, { useEffect, useRef, useState } from "react";
import { LatLngExpression, Map, marker, tileLayer } from "leaflet";
import "./ComplaintMap.scss";
import { useGetAllComplaints } from "../../hooks/api/useGetAllComplaints";
import { CUSTOM_EVENT } from "enums/CustomEvent";

function ComplaintMap() {
  const [map, setMap] = useState<Map>();
  const mapInit = useRef<boolean>(false);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const { data: complaints } = useGetAllComplaints();
  const center: LatLngExpression = [40.416775, -3.70379];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords([latitude, longitude]);
      });
    }
  }, []);

  useEffect(() => {
    if (map && userCoords) {
      map.setView(userCoords, 15);
    }
  }, [map, userCoords]);

  useEffect(() => {
    addMarkers();
  }, [complaints]);

  const initMap = () => {
    map &&
      tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
        },
      ).addTo(map);
  };
  const addMarkers = () => {
    if (map && complaints) {
      complaints.map((complaint) => {
        const description = `<b>${complaint.title}</b><br>${complaint.description}<br><br>${complaint.address ? complaint.address : ''}`
        return marker([complaint.position[0], complaint.position[1]],  {alt: description})
          .addTo(map)
          .bindPopup(description)
      });
    }
  };

  useEffect(() => {
    if (!mapInit.current) {
      mapInit.current = true;
      setMap(
        new Map("map", {
          center,
          zoom: 15
        }),
      );
    }
    if (map) {
      initMap();
      addMarkers();
      map.invalidateSize();
    }
  }, [mapInit, map]);


  useEffect(() => {
    if (map) {
      const handleRowMouseOver = (event: CustomEvent<any>) => {
        const position = event.detail;
        map.setView(position, 15);
      };
  
      window.addEventListener(CUSTOM_EVENT.MOUSE_OVER_ROW, handleRowMouseOver as EventListener);
  
      return () => {
        window.removeEventListener(CUSTOM_EVENT.MOUSE_OVER_ROW, handleRowMouseOver as EventListener);
      };
    }
  }, [map]);
  

  return <div id="map"></div>;
}

export default ComplaintMap;
