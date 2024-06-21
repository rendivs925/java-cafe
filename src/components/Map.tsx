"use client";

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, LatLngExpression } from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<LeafletMap | null>(null);
  const center: LatLngExpression = { lng: 13.338414, lat: 52.507932 };
  const [zoom] = useState<number>(12);

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    if (mapContainer.current) {
      map.current = new L.Map(mapContainer.current, {
        center: L.latLng(center.lat, center.lng),
        zoom: zoom,
      });

      // Create a MapTiler Layer inside Leaflet
      new MaptilerLayer({
        // Get your free API key at https://cloud.maptiler.com
        apiKey: "qoq8wEkPuvJygd6htGsl",
      }).addTo(map.current);
    }
  }, [center, zoom]);

  return (
    <div className="mapWrap z-0">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
