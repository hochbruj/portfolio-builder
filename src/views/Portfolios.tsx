import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Portfolio } from "../sharedTypes/portfolios";
import { formatPercentage } from "../utilities/formatters";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../config/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: 600,
  },
}));

interface PortfoliosProps {
  portfolios: Portfolio[] | null;
}

const Portfolios: FC<PortfoliosProps> = ({ portfolios }) => {
  const classes = useStyles();
  const history = useHistory();

  const viewDetail = (portfolio: Portfolio) => {
    history.push(ROUTES.PORTFOLIO, { portfolio });
  };

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Portfolio allocation models
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            These allocation models can help you understand different
            goals-based investment strategies. There's no right or wrong model,
            so it's important to tune in to what you feel best fits your goals
            and risk tolerance.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {portfolios ? (
          <Grid container spacing={4}>
            {portfolios
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((portfolio: Portfolio) => (
                <Grid item key={portfolio.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`/images/Portfolio_${portfolio.id}.jpg`}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {portfolio.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h2"
                        className={classes.bold}
                      >
                        Historical Risk/Return (5 years)
                      </Typography>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="left"
                          >
                            Average annual return
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="right"
                          >
                            {formatPercentage(portfolio.year5.apy)}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="left"
                          >
                            Best 12 months
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="right"
                          >
                            {formatPercentage(portfolio.year5.best12Months)}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="left"
                          >
                            Worst 12 months
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="body1"
                            component="h2"
                            align="right"
                          >
                            {formatPercentage(portfolio.year5.worst12Months)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => viewDetail(portfolio)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        )}
      </Container>
    </main>
  );
};
export default Portfolios;