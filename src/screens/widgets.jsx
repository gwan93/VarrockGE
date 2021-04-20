import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Widget from "./widget";
import { authContext } from "../AuthProvider";
import axios from "axios";
import {
  Typography,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Container,
  TextField,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  button: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  check: {
    flexGrow: 1,
    marginTop: "2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}));

export default function Widgets() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const [filters, setFilters] = useState({
    filterList: [],
    activeFilters: [],
  });
  console.log("state", state.widgets);
  // console.log('filters', filters)

  useEffect(() => {
    Promise.all([axios.get("/rarities"), axios.get("/subcategories")]).then(
      (all) => {
        const [rarities, subcategories] = all;
        const combinedArray = [...rarities.data, ...subcategories.data];
        setFilters((prev) => ({
          ...prev,
          filterList: combinedArray,
        }));
      }
    );
  }, []);

  // For each filter, render a checkbox and the name of the filter
  const renderRarityFilters = () => {
    const filterList = filters.filterList.map((filter) => {
      return (
        <div key={filter.name}>
          <input
            id={filter.name}
            type="checkbox"
            checked={filters.activeFilters.includes(filter.name)}
            onChange={() => onFilterChange(filter.name)} // eg. filter.name = "Pokemon"
          />
          <label htmlFor={filter.name}>{filter.name}</label>
        </div>
      );
    });
    return filterList;
  };

  const onFilterChange = (filter) => {
    // If the "all" checkbox is interacted with:
    // Uncheck all filter checkboxes if all filters were originally checked, OR
    // Check all filter checkboxes if at least one filter was not originally checked
    if (filter === "ALL") {
      if (filters.activeFilters.length === filters.filterList.length) {
        setFilters((prev) => ({
          ...prev,
          activeFilters: [],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeFilters: filters.filterList.map((filter) => filter.name),
        }));
      }
    } else {
      // If a filter checkbox is interacted with:
      // Remove it from the filters.activeFilters array if the box is unchecked, OR
      // Add it to the filters.activeFilters array if the box is checked
      if (filters.activeFilters.includes(filter)) {
        const filterIndex = filters.activeFilters.indexOf(filter);
        const newFilter = [...filters.activeFilters];
        newFilter.splice(filterIndex, 1);
        setFilters((prev) => ({
          ...prev,
          activeFilters: newFilter,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeFilters: [...filters.activeFilters, filter],
        }));
      }
    }
  };

  // Renders all widgets onto the page
  const renderWidgetList = () => {
    // If there are no active filters or all filter checkboxes are checked,
    // then render every single widget available
    // otherwise, only render the widgets that satisfy the filters in the active filters list
    let filteredList;
    if (
      filters.activeFilters.length === 0 ||
      filters.activeFilters.length === filters.filterList.length
    ) {
      filteredList = state.widgets;
    } else {
      filteredList = state.widgets.filter((item) => {
        return (
          filters.activeFilters.includes(item.rarity_id) &&
          filters.activeFilters.includes(item.subcategory_id)
        );
      });
    }

    // The filteredList may be showing widgets out of order.
    // Sort the filteredList by their widget id numbers, lowest id numbers first
    filteredList = filteredList.sort((a, b) => a.id - b.id);

    // Render each widget onto the page based on what's in filteredList
    // Do a final check to make sure that widget.for_sale_by_owner is true
    // and that the owner does indeed intend to sell that widget
    const widgetList = filteredList
      .filter((widget) => widget.for_sale_by_owner)
      .map((widget) => {
        return (
          <Grid item key={widget.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia className={classes.cardMedia} title="Image title">
              <img src={widget.imgurl} width="298" />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {widget.name}
              </Typography>
              <Typography>
                WidgetID {widget.id}: {widget.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                <Link to={`/widgets/${widget.id}`}>Clickme</Link>
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        );
      });
     return widgetList;
  };


  return (
    <div>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              NFT Marketplace
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Please select a widget to view
            </Typography>
          </Container>
        </div>
        <div align="left" direction="row">
          <Container>
            <Grid className={classes.check}>
              <input
                id="myInput"
                type="checkbox"
                onChange={() => onFilterChange("ALL")}
                checked={
                  filters.activeFilters.length === filters.filterList.length
                }
              />
              <label htmlFor="myInput">All</label>
              {renderRarityFilters()}
            </Grid>
            <Switch>
              <Route path="/widgets/:widgetID" component={Widget} />
              <Route path="/widgets"></Route>
            </Switch>
            {/* <nav>{renderWidgetList()}</nav> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {renderWidgetList()}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
