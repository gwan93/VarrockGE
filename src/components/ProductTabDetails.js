import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


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
}));

export default function ProductTabDetails(props) {
  const classes = useStyles();
  const { description, current_sell_price_cents, for_sale_by_owner, rarity, subcategory, addToCart } = props;

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
        <Button color="primary" onClick={() => addToCart()} size="large">Add to cart</Button>
      </div>
    </div>
  );
}