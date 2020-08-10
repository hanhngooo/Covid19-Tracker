import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./Map.css";

function Map(props) {
  const casesTypeColors = {
    cases: {
      hex: "#FF651D",
      multiplier: 800,
    },
    recovered: {
      hex: "#66D366",
      multiplier: 1200,
    },
    deaths: {
      hex: "#FF651D",
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
            >
              <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="info-recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="info-deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
      </LeafletMap>
    </div>
  );
}

export default Map;
