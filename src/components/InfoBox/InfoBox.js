import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox-title" color="textPrimary">
          {props.title}
        </Typography>

        <h2 className="infoBox-cases">{props.cases}</h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
