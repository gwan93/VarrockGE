import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Widget from "./widget";
import { authContext } from "../AuthProvider";
import axios from "axios";
import {
  Typography,
  Card,
  CssBaseline,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css"
import Product from '../components/Product';
require('dotenv').config({path: './../.env'});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://i.imgur.com/WEBV8Q1.gif)`,
    backgroundPosition: "center center",
  },
  cardGrid: {
    padding: "40px 0",
  },

  check: {
    fontSize: "20px",

    marginTop: "3em",
    marginBottom: "3em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  checkbackground: {
    marginBottom: "3em",
    transition: 'box-shadow .1s',
    "&:hover": {
      boxShadow: '0 0 11px rgba(33,33,33,.2)'
    }
  },
  main: {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://i.imgur.com/WEBV8Q1.gif)`,
    backgroundPosition: "center center",
    marginTop: '75px'
  },
}));

export default function Widgets() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const [filters, setFilters] = useState({
    filterList: [],
    activeFilters: [],
  });
  // console.log("state", state.widgets);
  // console.log('filters', filters)


  useEffect(() => {
    Promise.all([axios.get(`${process.env.REACT_APP_API_URL}/rarities`), axios.get(`${process.env.REACT_APP_API_URL}/subcategories`)]).then(
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
        <div className="checkbox" key={filter.name}>
          <input
            id={filter.name}
            type="checkbox"
            checked={filters.activeFilters.includes(filter.name)}
            onChange={() => onFilterChange(filter.name)} // eg. filter.name = "Pokemon"
          />
          <span>
            <label htmlFor={filter.name}> {filter.name}</label>
          </span>
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
          <Product
            key={widget.id}
            id={widget.id}
            imgurl={widget.imgurl}
            description={widget.description}
            rarity_id={widget.rarity_id}
            subcategory_id={widget.subcategory_id}
            name={widget.name}
            msrp_cents={widget.msrp_cents}
            for_sale_by_owner={widget.for_sale_by_owner}
            hash={widget.hash}
            current_sell_price_cents={widget.current_sell_price_cents}
          />
        );
      });
     return widgetList;
  };


  return (
    <div>
      <CssBaseline />
      <main className={classes.main}>
        <div className={classes.container}>
          <Container>
            <Typography align="center" color="textPrimary" gutterBottom>
              <img src="https://bit.ly/32wJmi7" alt=""></img>
            </Typography>
          </Container>
        </div>
        <div align="left" direction="row">
          <Container>
            <Card className={classes.checkbackground} variant="outlined">
              <Grid className={classes.check}>
                <div className="checkbox">
                  <input
                    id="myInput"
                    type="checkbox"
                    label="All"
                    onChange={() => onFilterChange("ALL")}
                    checked={
                      filters.activeFilters.length === filters.filterList.length
                    }
                  />
                  <label htmlFor="myInput">All </label>
                </div>
                {renderRarityFilters()}
              </Grid>
            </Card>
            <Switch>
              <Route path="/widgets/:widgetID" component={Widget} />
              <Route path="/widgets"></Route>
            </Switch>
          </Container>
        </div>
        <p></p>
        <Typography align="center" color="textPrimary" gutterBottom variant="h6">
          Select an NFT to view
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {renderWidgetList()}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
