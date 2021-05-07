import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Grid,
  TextField,
  Divider,
  Chip
} from "@material-ui/core";
import { authContext } from "../AuthProvider";
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  updateForm: {
    width: '15em',
    margin: '1em 0 1em 0'
  },
  submit: {
    backgroundColor: 'lightgrey'
  }
}));

export default function ProductTabDetails(props) {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const [sellPrice, setSellPrice] = useState("");
  let history = useHistory();
  const { id, description, current_sell_price_cents, for_sale_by_owner, rarity, subcategory, addToCart } = props;

  const onSetSellPrice = (event) => {
    setSellPrice(event.target.value)
  };

  const updateSellPrice = (event, id) => {
    event.preventDefault();
    // console.log('updatesellprice', id, sellPrice)    
    // Sell price * 100 to convert it from decimal to integer
    // eg Convert 15.25 dollars to 1525 cents to prevent floating point conflicts in database
    axios.post(`${process.env.REACT_APP_API_URL}/widgets/${id}`,  {sellPrice: sellPrice * 100} )
    .then((response) => {
      // console.log('3. Axios Post response', response)
      history.go(0);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
  };

  const updatePrice = () => {
    return (
      <form onSubmit={(event) => updateSellPrice(event, id)}>
        <Grid className={classes.updateForm}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              fullWidth
              label="Update Price ($)"
              onChange={onSetSellPrice}
              placeholder={String(current_sell_price_cents / 100)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Description
          </Typography>
          <div>
            <Typography color="textPrimary" variant="body2">
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <Divider variant="middle" />

      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Rarity
        </Typography>
        <div>
          <Chip className={classes.chip} label={rarity} />
        </div>
      </div>
      <Divider variant="middle" />

      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Subcategory
        </Typography>
        <div>
          <Chip className={classes.chip} label={subcategory} />
        </div>
      </div>
      <Divider variant="middle" />

      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          For Sale
        </Typography>
        <div>
          <Chip className={classes.chip} label={String(for_sale_by_owner)} />
          <Chip className={classes.chip} label={"$" + (current_sell_price_cents / 100).toFixed(2)} />
        </div>
      </div>
      <Divider variant="middle" />

      <div className={classes.section3}>
        {state.myWidgets.includes(props.id) && (
          <div>
            <Chip label="Owned" />
            {updatePrice()}
          </div>
        )}
        {!state.myWidgets.includes(props.id) && (
          <Button color="primary" onClick={() => addToCart()} size="large">Add to cart</Button>
        )}
      </div>
    </div>
  );
}