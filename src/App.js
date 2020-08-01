import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { apiUrl } from "./config/constants";
import InfoBox from "./components/InfoBox/InfoBox";
import { fetchAllCountries, fetchData } from "./store/data/actions";
import { selectCountries, selectData } from "./store/data/selectors";

function App() {
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("Global");
  // const [countryInfo, setCountryInfo] = useState({});

  const countries = useSelector(selectCountries).filter(
    (country) => country.countryInfo.iso2 !== null
  );
  const countryInfo = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchAllCountries());
    dispatch(fetchData(`${apiUrl}/all`));
  }, [dispatch]);

  const onCountryChange = (event) => {
    const countryChanged = event.target.value;
    const url =
      countryChanged === "Global"
        ? `${apiUrl}/all`
        : `${apiUrl}/countries/${countryChanged}`;
    dispatch(fetchData(url));
    setCountryName(countryChanged);
  };
  return (
    <div className="app">
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
          title="Confirmed Cases"
          cases={countryInfo.cases}
          todayCases={countryInfo.todayCases}
          subTitle="cases"
        />
        <InfoBox
          title="Deaths"
          cases={countryInfo.deaths}
          todayCases={countryInfo.todayDeaths}
          subTitle="deaths"
        />
        <InfoBox
          title="Recovered"
          cases={countryInfo.recovered}
          todayCases={countryInfo.todayRecovered}
          subTitle="recovered"
        />
      </div>
    </div>
  );
}

export default App;
