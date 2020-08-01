import React from "react";
import "./DataTable.css";
import { Grid, Typography } from "@material-ui/core";

function DataTable(props) {
  return (
    <div className="dataTable">
      {props.sortedCountries &&
        props.sortedCountries.map((country) => (
          <Grid container className="data-row">
            <Grid item xs={12} className="country-name">
              <strong>{country.country}</strong>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs={12} sm={4} className="country-data">
                {country.cases}
                <Typography color="textSecondary">Cases</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="country-data">
                {country.deaths}
                <Typography color="textSecondary">Deaths</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="country-data">
                {country.recovered}
                <Typography color="textSecondary">Recovered</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}

export default DataTable;
