import React from "react";
import { useHistory } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  
  Button,
  makeStyles,
  Grid,
  
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: "100vh",
    backgroundImage: `url(https://i.imgur.com/dj04uE0.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    overflow: 'hidden'
  },
  buttonContainer: {
    marginTop: "1em",
    marginLeft: "1em",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#56144D",
    },
  },
  marketButton: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#56144D",
    },
  },
}));

export default function Home({ setNavbar }) {
  let classes = useStyles();
  let history = useHistory();
  const redirectLogin = () => {
    history.push("/login");
  };
  const redirectWidget = () => {
    history.push("/widgets");
  };

  return (
    <div>
      <CssBaseline>
        <Paper className={classes.paperContainer}>
          <div>
            <Grid
              container
              alignContent={"flex-end"}
              alignItems={"flex-end"}
              justify={"flex-start"}
              spacing={"2"}
            >
              <Grid item>
                <Button
                  className={classes.buttonContainer}
                  color={"primary"}
                  onClick={redirectLogin}
                  size={"large"}
                  variant={"contained"}
                  textSizeLarge
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.marketButton}
                  onClick={redirectWidget}
                  size={"large"}
                  variant={"contained"}
                >
                  MarketPlace
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </CssBaseline>
    </div>
  );
}
