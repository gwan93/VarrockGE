import {
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "5px 5px 5px 5px",
    border: "2px lightgrey solid",
    transition: "box-shadow .1s",
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.2)",
    },
  },
  cardMedia: {
    display: "flex",
    alignItems: "center",
    height: "435px",
  },
  textLink: {
    color: "inherit",
  },
  view: {
    flexGrow: 1,
    alignSelf: "center",
    alignItems: "last baseline",
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card} variant="outlined">
        <CardMedia className={classes.cardMedia}>
          <img src={props.imgurl} width="280" alt="" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5">
            <Link className={classes.textLink} to={`/widgets/${props.id}`}>
              {props.name}
            </Link>
          </Typography>
          <Typography>
            NFT # {props.id}: {props.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.view}>
          <Button
            size="small"
            color="primary"
            style={{ textDecoration: "none" }}
            component={Link}
            to={`/widgets/${props.id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
