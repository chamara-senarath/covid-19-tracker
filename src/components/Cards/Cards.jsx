import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUP from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }) {
  if (!confirmed) {
    return "Loading";
  }
  const cardList = ["confirmed", "recovered", "deaths"];
  const mappedCardList = cardList.map((cardName) => {
    return (
      <Grid
        item
        component={Card}
        key={cardName}
        xs={12}
        md={3}
        className={cx(styles.card, styles[cardName])}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {cardName.charAt(0).toUpperCase() + cardName.slice(1)}
          </Typography>
          <Typography variant="h5">
            <CountUP
              start={0}
              end={eval(cardName).value}
              duration={1.5}
              separator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2">
            {cardName == "confirmed"
              ? "Number of active cases of CODVID-19"
              : cardName == "recovered"
              ? "Number of recoveries from COVID-19"
              : "Number of deaths caused by COVID-19"}{" "}
          </Typography>
        </CardContent>
      </Grid>
    );
  });
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {mappedCardList}
      </Grid>
    </div>
  );
}

export default Cards;
