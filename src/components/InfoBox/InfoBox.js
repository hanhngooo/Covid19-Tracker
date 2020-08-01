import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox-title" color="textPrimary">
          {props.title}
        </Typography>

        <h2 className="infoBox-cases">{props.cases}</h2>
        <Typography className="infoBox-newCases" color="textSecondary">
          {props.todayCases} today {props.subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
