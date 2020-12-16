import React from "react";
import "./DataTable.css";
import { Grid, Typography } from "@material-ui/core";
import numeral from "numeral";

function DataTable(props) {
  return (
    <div className="dataTable">
      {props.sortedCountries &&
        props.sortedCountries.map((country, index) => (
          <Grid container className="data-row" key={index}>
            <Grid item xs={12} className="country-name">
              <strong>{country.country}</strong>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4} className="country-data">
                {numeral(country.cases).format("0,0")}
                <Typography color="textSecondary">Cases</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="country-data">
                {numeral(country.deaths).format("0,0")}
                <Typography color="textSecondary">Deaths</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="country-data">
                {numeral(country.recovered).format("0,0")}
                <Typography color="textSecondary">Recovered</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}

export default DataTable;
