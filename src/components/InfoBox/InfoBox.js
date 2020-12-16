import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox(props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && "infoBox-selected"}  ${
        props.isRed && "infoBox-red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox-title" color="textPrimary">
          {props.title}
        </Typography>

        <h3
          className={`infoBox-cases ${!props.isRed && "infoBox-cases-green"}`}
        >
          {props.cases}
        </h3>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
