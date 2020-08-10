import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
// import numeral from "numeral";
import { Circle } from "react-leaflet";
import "./Map.css";

function Map(props) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };

  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.countries &&
          props.countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              color={casesTypeColors[props.casesType].hex}
              fillColor={casesTypeColors[props.casesType].hex}
              fillOpacity={0.4}
              radius={
                Math.sqrt(country[props.casesType]) *
                casesTypeColors[props.casesType].multiplier
              }
            ></Circle>
          ))}
      </LeafletMap>
    </div>
  );
}

export default Map;
