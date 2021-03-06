import { FC, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Portfolio } from "../sharedTypes/portfolios";
import { formatPercentage, formatToUsd } from "../utilities/formatters";
import { Redirect, useHistory } from "react-router-dom";
import { ROUTES } from "../config/routes";
import AssetTable from "../components/AssetTable";
import { useStore } from "../store/store";
import { dailyDelta, totalUsdBalance } from "../utilities/calculations";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: theme.spacing(4, 0, 6),
  },
  positive: {
    color: "#1cc760;",
  },
  negative: {
    color: "#ff5050;",
  },
}));

const Dashboard: FC = () => {
  const classes = useStyles();
  const { state } = useStore();
  const { balances, connectedWeb3, prices } = state;

  if (!connectedWeb3 || !state.user?.portfolioId) {
    return <Redirect to={ROUTES.PORTFOLIOS} />;
  }

  return (
    <main>
      {balances && connectedWeb3 && prices ? (
        <div className={classes.content}>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" color="textPrimary">
                  {formatToUsd(totalUsdBalance(balances!, prices))}
                </Typography>
                <Typography
                  variant="h6"
                  className={
                    dailyDelta(balances, prices) < 0
                      ? classes.negative
                      : classes.positive
                  }
                >
                  {formatToUsd(dailyDelta(balances, prices), "exceptZero")} (
                  {formatPercentage(
                    dailyDelta(balances, prices) /
                      totalUsdBalance(balances!, prices),
                    true
                  )}
                  )
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AssetTable />
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
    </main>
  );
};
export default Dashboard;
