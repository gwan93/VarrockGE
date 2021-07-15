import React from "react";
import { useHistory } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  Button,
  makeStyles
} from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles(() => ({
  paperContainer: {
    height: "100vh",
    backgroundImage: `url(https://i.imgur.com/dj04uE0.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    overflow: 'hidden'
  },
  buttonContainer: {
    display: "flex",
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: "1em",
    marginLeft: "1em",
  },
  button: {
    marginRight: "0.3em",
    opacity: "0.6",
    backgroundColor: "white",
    "&:hover": {
      opacity: "0.8",
      backgroundColor: "#e9ecef",
    },
  },
}));

export default function Home({ setNavbar }) {
  let classes = useStyles();
  let history = useHistory();

  const redirectLogin = () => history.push("/login");
  const redirectWidget = () => history.push("/widgets");

  useEffect(() => {
    // Wakes up Heroku API server
    axios.get(`${process.env.REACT_APP_API_URL}/widgets`)
  }, []);

  return (
    <div>
      <CssBaseline />
      <Paper className={classes.paperContainer}>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            onClick={redirectLogin}
            size="large"
            variant="contained"
          >
            Login
          </Button>
          <Button
            className={classes.button}
            onClick={redirectWidget}
            size="large"
            variant="contained"
          >
            MarketPlace
          </Button>
        </div>
      </Paper>
    </div>
  );
}
