import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

import { apiUrl } from "./config/constants";
import InfoBox from "./components/InfoBox/InfoBox";
import DataTable from "./components/DataTable/DataTable.js";
import Chart from "./components/Chart/Chart";
import Map from "./components/Map/Map";
import {
  fetchAllCountries,
  fetchData,
  fetchHistoricalData,
} from "./store/data/actions";
import { selectCountries, selectData } from "./store/data/selectors";
// import { set } from "numeral";

function App() {
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("Global");
  const [casesType, setCasesType] = useState("cases");
  const globalMapCenter = { lat: 34.80746, lng: -40.4796 };
  const [mapZoom, setMapZoom] = useState(3);
  const countries = useSelector(selectCountries).filter(
    (country) => country.countryInfo.iso2 !== null
  );
  const sortedCountries = countries.sort((a, b) => b.cases - a.cases);
  const countryInfo = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchAllCountries());
    dispatch(fetchData(`${apiUrl}/all`));
    dispatch(fetchHistoricalData(`${apiUrl}/historical/all?lastdays=120`));
  }, [dispatch]);

  const onCountryChange = (event) => {
    const countryChanged = event.target.value;
    setCountryName(countryChanged);
    const dataUrl =
      countryChanged === "Global"
        ? `${apiUrl}/all`
        : `${apiUrl}/countries/${countryChanged}`;
    dispatch(fetchData(dataUrl));
    setMapZoom(4);
  };
  return (
    <div className="app">
      <div className="app-left">
        <div className="app-header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app-dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={countryName}
            >
              <MenuItem value="Global">Global</MenuItem>
              {countries.map((country, index) => (
                <MenuItem value={country.countryInfo.iso2} key={index}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app-stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Confirmed Cases"
            cases={countryInfo.cases}
            subTitle="cases"
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.deaths}
            subTitle="deaths"
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.recovered}
            subTitle="recovered"
          />
        </div>
        <div className="app-graph">
          <h3>New {casesType}</h3>
          <Chart casesType={casesType} countryName={countryName} />
        </div>

        <Card className="app-countriesTable">
          <CardContent className="table-content">
            <h3>Cases by country</h3>
            <DataTable sortedCountries={sortedCountries} />
          </CardContent>
        </Card>
      </div>
      <div className="app-right">
        {countryName === "Global" ? (
          <Map center={globalMapCenter} zoom={mapZoom} />
        ) : (
          countryInfo.countryInfo && (
            <Map
              center={[
                countryInfo.countryInfo.lat,
                countryInfo.countryInfo.long,
              ]}
              zoom={mapZoom}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
