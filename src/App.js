import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";

import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
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
import numeral from "numeral";

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
  console.log("country info", countryInfo);

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
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app-dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={countryName}
            >
              <MenuItem value="Global">Global</MenuItem>
              {countries &&
                countries
                  .sort((a, b) => (a.country > b.country ? 1 : -1))
                  .map((country, index) => (
                    <MenuItem value={country.countryInfo.iso2} key={index}>
                      {country.country}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Grid container className="app-stats">
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="Cases"
                cases={numeral(countryInfo.cases).format("0,0")}
                subTitle="cases"
                active={casesType === "cases"}
                isRed
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                cases={numeral(countryInfo.deaths).format("0,0")}
                subTitle="deaths"
                active={casesType === "deaths"}
                isRed
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                cases={numeral(countryInfo.recovered).format("0,0")}
                subTitle="recovered"
                active={casesType === "recovered"}
              />
            </Grid>
          </Grid>
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
          <Map
            center={globalMapCenter}
            zoom={mapZoom}
            countries={sortedCountries}
            casesType={casesType}
          />
        ) : (
          countryInfo.countryInfo && (
            <Map
              center={[
                countryInfo.countryInfo.lat,
                countryInfo.countryInfo.long,
              ]}
              zoom={mapZoom}
              countries={sortedCountries}
              casesType={casesType}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
