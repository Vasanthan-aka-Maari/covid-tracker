import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import CountUp from "react-countup";
import "./InfoBox.css";

function InfoBox({ title, cases, cls, total }) {
  return (
    <Card className={`infoBox ${cls}`}>
      <CardContent>
        <Typography className="infoBox-title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox-cases">
          {cases && <CountUp end={cases} duration={5} />}
        </h2>
        <Typography className="infoBox-total" color="textSecondary">
          {total && <CountUp end={total} duration={5} />} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
