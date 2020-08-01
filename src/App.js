import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { fetchAllCountries } from "./store/data/actions";
import { selectCountries } from "./store/data/selectors";

function App() {
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("Global");

  const countries = useSelector(selectCountries);

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const onCountryChange = (event) => {
    const countryChanged = event.target.value;
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
            {countries.map((country) => (
              <MenuItem
                value={country.countryInfo.iso2}
                key={country.countryInfo.iso2}
              >
                {country.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
