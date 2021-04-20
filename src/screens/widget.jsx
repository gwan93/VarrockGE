import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider";
import {
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
   
  },
  card: {
    flexDirection: "column",
  },
 
  cardContent: {
    flexGrow: 0.5,
  },
  history: {
    marginLeft: "1.5em",
    marginTop: "2em",
    display: "flex",
  
    justifyContent: "center",
  },

  close: {
    flexGrow: 1,
  }
}));

export default function Widget(props) {
  const classes = useStyles();
  const { state, setState } = useContext(authContext);
  const { widgetID } = useParams();
  const [widget, setWidget] = useState({
    details: {},
    history: [],
  });

  // Axios request using widgetID from params to get
  // widget details and widget history
  useEffect(() => {
    axios.get(`/widgets/${widgetID}`).then((all) => {
      const [detailsResponse, historyResponse] = all.data;
      // Order the history objects by id (oldest first, newest last)
      const sortedResponseData = historyResponse.sort((a, b) => a.id - b.id);
      setWidget((prev) => ({
        ...prev,
        details: detailsResponse,
        history: sortedResponseData,
      }));
    });
  }, [widgetID]);

  const addToCart = () => {
    // Add this widget's id to state.itemsInCart
    const currentCart = [...state.itemsInCart];
    currentCart.push(widget.details.id);
    setState((prev) => ({
      ...prev,
      itemsInCart: currentCart,
    }));
  };

  const displayWidgetHistory = widget.history.map((historyData) => {
    return (
      <ul key={historyData.id}>
        <Grid md={6} className={classes.card}>
        <Card >
          Date Purchased: 
          <p></p>
          {`${new Date(historyData.date_purchased.toString())}`}
        <p></p>
          By: {historyData.email} (userID: {historyData.id})
        <p></p>
        Bought For: ${historyData.bought_for_price_cents / 100}
        </Card>
        </Grid>
      </ul>
    );
  });

  return (
    <div align="center">
      <h3 align="center">NFT ID #{widgetID}</h3>
      <CssBaseline />
      
      <Grid item key={widgetID} xs={12} sm={6} md={3}>
        <Card >
          <CardMedia title="Image title">
            <img src={widget.details.imgurl} width="306" />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {widget.details.name}
            </Typography>
            <Typography>
              NFT # {widget.details.id}: {widget.details.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button className={classes.cardContent} size="small" color="primary" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button className={classes.close}
              size="small"
              color="primary"
              style={{ textDecoration: "none" }}
              component={Link}
              to="/widgets"
            >
              Close
            </Button>
          </CardActions>
        </Card>
        </Grid>
        <Container>
          <Typography className={classes.history} variant="h5">
        NFT Purchase History
        </Typography>
        {displayWidgetHistory}
     </Container>
    
    </div>
    
  );
}
