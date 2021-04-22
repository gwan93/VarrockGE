import { authContext } from "../AuthProvider";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import history from '../History';
import { makeStyles, Button, Typography, Card, CardContent, CardMedia, CssBaseline, Grid, Container } from '@material-ui/core';
import "../App.css"

const useStyles = makeStyles((theme) => ({
  main:{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://dw.convertfiles.com/files/0011087001619042393/circuitboard.gif)`,
    backgroundPosition: "center center",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '75px'
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
    border: 'rgb(224, 224, 224) 2px solid',
    borderRadius: '5px',
    width: "960px",
    margin: '8px 0 8px 0',
    transition: 'box-shadow .1s',
    "&:hover": {
      boxShadow: '0 0 11px rgba(33,33,33,.2)'
    }
  },
  button: {
    marginTop: '40px',
  },
  textLink: {
    color: 'inherit',
    // textDecoration: 'inherit'
  },
  cardGrid: {
    padding: '20px 10px 10px 10px',
    // border: 'rgb(224, 224, 224) 2px solid',
    borderRadius: '5px',
    marginBottom: '20px'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 4px 5px 4px',
    border: '2px lightgrey solid',
    transition: 'box-shadow .1s',
    "&:hover": {
      boxShadow: '0 0 11px rgba(33,33,33,.2)'
    }
  },
  cardMedia: {
    display: 'flex',
    alignItems: 'center',
    height: '435px'
  },
  cardContent: {
    flexGrow: 1
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    backgroundImage: `url(https://scontent.fyvr2-1.fna.fbcdn.net/v/t1.15752-9/176033620_192587326008749_5812437287084734516_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=ae9488&_nc_ohc=56iZXK8TulQAX8G1xQ5&_nc_ht=scontent.fyvr2-1.fna&oh=ba1030ec1d0e50c820ed56a2f0b846f9&oe=60A4692B)`,
    alignItems: 'center',
    marginTop:'2em'
  }
}));
export default function Cart() {
  const classes = useStyles();
  const { state, setState } = useContext(authContext);
  const { itemsInCart } = state;
  const stateWidgets = state.widgets;
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // console.log('Cart items', itemsInCart);

  // Uses the widget data stored within state to return
  // a filtered array that consists of items only in the cart
  const cartItemDetails = stateWidgets.filter((widget) => {
    return itemsInCart.includes(widget.id);
  });

  // These are the filtered widgets' details to be displayed
  const showWidgets = cartItemDetails.map((widget) => {
    return (
        <Grid item key={widget.id} xs={12} sm={6} md={4}>
          <Card className={classes.card} variant="outlined">
            <CardMedia className={classes.cardMedia}>
              <img src={widget.imgurl} width="280" alt=""/>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" >
                <Link className={classes.textLink} to={`/widgets/${widget.id}`}>{widget.name}</Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Current Price: ${(widget.current_sell_price_cents / 100).toFixed(2)}
              </Typography>
              <Typography>
                {widget.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  
    

  // Calculate subtotal for all the widgets in the cart
  const widgetPriceArray = [];
  cartItemDetails.map((widget) =>
    widgetPriceArray.push(widget.current_sell_price_cents)
  );
  const cartSubtotal = widgetPriceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const emptyCart = (widgetIDs) => {
    console.log("emptying cart");
    let newMyWidgets = [...state.myWidgets];

    for (const widgetID of widgetIDs) {
      if (!newMyWidgets.includes(widgetID)) {
        newMyWidgets.push(widgetID);
      }
    }

    newMyWidgets = newMyWidgets.sort((a, b) => a - b);

    setState((prev) => ({
      ...prev,
      itemsInCart: [],
      myWidgets: newMyWidgets
    }));
  };

  const checkout = (state, cartItemDetails) => {

    const widgetIDs = cartItemDetails.map(widget => widget.id);
    // Create array of items to transfer ownership (aka to be bought)
    const postObject = [];
    cartItemDetails.map((cartItem) => {
      cartItem.for_sale_by_owner = false;
      const cartObject = {
        userID: state.user.id,
        widgetID: cartItem.id,
        boughtForPriceCents: cartItem.current_sell_price_cents,
        for_sale_by_owner: cartItem.for_sale_by_owner,
      };
      return postObject.push(cartObject);
    });


    // Submit that array along with the post request
    axios
      .post(`/widgets/checkout`, postObject)
      .then((response) => {
        // console.log('in response)')
        console.log('in response', response)
        setCheckoutSuccess(true);
        if (response.status === 200) {
          emptyCart(widgetIDs);
          history.push("/widgets");
        }
      })
      .catch((err) => console.log("Error purchasing", err));
  };

  return (
    <div>
      <CssBaseline>
        <main className={classes.main}>
          <div className={classes.container}>
            <Container>
              {checkoutSuccess && <h2>Thank you for your purchase!</h2>}
              <Typography variant="h3" align="center" gutterBottom>
                Cart
              </Typography>
            </Container>


          </div>

          <div className={classes.container}>
            <Container>
              <div align="center">
                {itemsInCart.length !== 0 && <h2>Total: ${cartSubtotal / 100}</h2>}
                {itemsInCart.length !== 0 && (
                  <Button
                    onClick={() => checkout(state, cartItemDetails)}
                    color={"inherit"}
                    size={"medium"}
                    variant={"contained"}
                    >
                    Check Out
                  </Button>
                )}
                {itemsInCart.length === 0 && <Typography
                  variant={"h6"}
                  align={"center"}
                  color={"secondary"}
                  gutterBottom
                >Your Cart is Empty.</Typography>
                }

              </div>
            </Container>
          </div>

          {itemsInCart.length !== 0 && (
            <div className={classes.container}>
              <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                  NFTs in cart
                </Typography>
                <Grid className={classes.grid} container spacing={3}>
                  {showWidgets}
                </Grid>
              </Container>
            </div>
          )}

          <Container align="center">
            {/* <div
            align="center"
            ></div> */}
            <img src="https://scontent.fyvr2-1.fna.fbcdn.net/v/t1.15752-9/175944101_831094944205099_8398184698228450241_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_ohc=H5IqacPwaqAAX8r6V9F&_nc_ht=scontent.fyvr2-1.fna&oh=33fc241f03e41e37d4f001d6dc0b3bbb&oe=60A52AF3" width="400" height="400" align="center" className={classes.imageContainer}></img>
          </Container>
        </main>
      </CssBaseline>
    </div>
  );
}
