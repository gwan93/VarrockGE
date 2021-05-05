import React, { useContext, useEffect, useState } from "react";
// import { Route, Switch } from "react-router-dom";
// import Widget from "./widget";
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
import ProductCard from '../components/ProductCard';
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
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  sidebar: {
    marginBottom: "3em",
    transition: 'box-shadow .1s',
    "&:hover": {
      boxShadow: '0 0 11px rgba(33,33,33,.2)'
    },
    border: '3px purple solid',
    padding: '0 1em 0 1em'
  },
  main: {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://i.imgur.com/WEBV8Q1.gif)`,
    backgroundPosition: "center center",
    display: 'flex',
    flexDirection: 'column',
    marginTop: '75px',
    minHeight: 'calc(100vh - 75px)',
    border: '3px yellow solid',
  },
  marketplace: {
    border: '3px red solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '0 5vw 0 5vw',
  },
  products: {
    border: '3px blue solid',
    padding: '0 1em 0 1em',
    flexGrow: 1
  },
  filterList: {
    border: '3px green solid',
    width: '15%'
    // padding: '0 1em 0 1em'

  }
}));

export default function Widgets() {
  const classes = useStyles();
  const { state } = useContext(authContext);
  const [filters, setFilters] = useState({
    rarityFilterList: [],
    activeRarityFilters: [],
    subcategoryFilterList: [],
    activeSubcategoryFilters: []
  });
  // console.log("state", state.widgets);
  // console.log('filters', filters)


  useEffect(() => {
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/rarities`),
      axios.get(`${process.env.REACT_APP_API_URL}/subcategories`)
    ])
      .then(
      (all) => {
        const [rarities, subcategories] = all;
        const rarityNames = rarities.data.map((rarity) => rarity.name)
        const subcategoryNames = subcategories.data.map((subcategory) => subcategory.name)

        setFilters((prev) => ({
          ...prev,
          rarityFilterList: [...rarities.data],
          activeRarityFilters: rarityNames,
          subcategoryFilterList: [...subcategories.data],
          activeSubcategoryFilters: subcategoryNames
        }));
      }
    );
  }, []);

  // For each filter, render a checkbox and the name of the filter
  const renderRarityFilters = () => {
    const filterList = filters.rarityFilterList.map((filter) => {
      return (
        <div className="checkbox" key={filter.name}>
          <input
            id={filter.name}
            type="checkbox"
            checked={filters.activeRarityFilters.includes(filter.name)}
            onChange={() => onRarityFilterChange(filter.name)} // eg. filter.name = "Pokemon"
          />
          <span>
            <label htmlFor={filter.name}> {filter.name}</label>
          </span>
        </div>
      );
    });
    return filterList;
  };

  const renderSubcategoryFilters = () => {
    const filterList = filters.subcategoryFilterList.map((filter) => {
      // console.log('filter', filter, 'filters.activeSubcategoryFilters', filters.activeSubcategoryFilters, filters.activeSubcategoryFilters.includes(filter.name))
      // console.log('within filters', filter)
      return (
        <div className="checkbox" key={filter.name}>
          <input
            id={filter.name}
            type="checkbox"
            checked={filters.activeSubcategoryFilters.includes(filter.name)}
            onChange={() => onSubcategoryFilterChange(filter.name)} // eg. filter.name = "Pokemon"
          />
          <span>
            <label htmlFor={filter.name}> {filter.name}</label>
          </span>
        </div>
      );
    });
    return filterList;
  };

  const onRarityFilterChange = (filter) => {
    // If the "all" checkbox is interacted with:
    // Uncheck all filter checkboxes if all filters were originally checked, OR
    // Check all filter checkboxes if at least one filter was not originally checked
    if (filter === "ALLRARITIES") {
      if (filters.activeRarityFilters.length === filters.rarityFilterList.length) {
        setFilters((prev) => ({
          ...prev,
          activeRarityFilters: [],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeRarityFilters: filters.rarityFilterList.map((filter) => filter.name),
        }));
      }
    } else {
      // If a filter checkbox is interacted with:
      // Remove it from the filters.activeFilters array if the box is unchecked, OR
      // Add it to the filters.activeFilters array if the box is checked
      if (filters.activeRarityFilters.includes(filter)) {
        const filterIndex = filters.activeRarityFilters.indexOf(filter);
        const newFilter = [...filters.activeRarityFilters];
        newFilter.splice(filterIndex, 1);
        setFilters((prev) => ({
          ...prev,
          activeRarityFilters: newFilter,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeRarityFilters: [...filters.activeRarityFilters, filter],
        }));
      }
    }
  };

  const onSubcategoryFilterChange = (filter) => {
    // If the "all" checkbox is interacted with:
    // Uncheck all filter checkboxes if all filters were originally checked, OR
    // Check all filter checkboxes if at least one filter was not originally checked
    if (filter === "ALLSUBCATEGORIES") {
      if (filters.activeSubcategoryFilters.length === filters.subcategoryFilterList.length) {
        setFilters((prev) => ({
          ...prev,
          activeSubcategoryFilters: [],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeSubcategoryFilters: filters.subcategoryFilterList.map((filter) => filter.name),
        }));
      }
    } else {
      // If a filter checkbox is interacted with:
      // Remove it from the filters.activeFilters array if the box is unchecked, OR
      // Add it to the filters.activeFilters array if the box is checked
      if (filters.activeSubcategoryFilters.includes(filter)) {
        const filterIndex = filters.activeSubcategoryFilters.indexOf(filter);
        const newFilter = [...filters.activeSubcategoryFilters];
        newFilter.splice(filterIndex, 1);
        setFilters((prev) => ({
          ...prev,
          activeSubcategoryFilters: newFilter,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          activeSubcategoryFilters: [...filters.activeSubcategoryFilters, filter],
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
    // if (
    //   filters.activeRarityFilters.length === 0 ||
    //   filters.activeRarityFilters.length === filters.rarityFilterList.length
    // ) {
    //   filteredList = state.widgets;
    // } else {
      filteredList = state.widgets.filter((item) => {
        return (
          filters.activeRarityFilters.includes(item.rarity_id) &&
          filters.activeSubcategoryFilters.includes(item.subcategory_id)
        );
      });
    // }

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
          <ProductCard
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
          {/* <Switch> */}
            {/* <Route path="/widgets/:widgetID" component={Widget} /> */}
            {/* <Route path="/widgets"></Route> */}
          {/* </Switch> */}
        </div>

        <div className={classes.marketplace}>
          <div className={classes.filterList}>
            <div align="left" direction="column">
              <Container>
                <Card className={classes.sidebar} variant="outlined">
                  <Typography>Filters</Typography>
                  <Grid className={classes.check}>
                    <div className="checkbox">
                      <input
                        id="allRarities"
                        type="checkbox"
                        label="All"
                        onChange={() => onRarityFilterChange("ALLRARITIES")}
                        checked={
                          filters.activeRarityFilters.length === filters.rarityFilterList.length
                        }
                      />
                      <label htmlFor="allRarities">All Rarities</label>
                    </div>
                    {renderRarityFilters()}
                    <div className="checkbox">
                      <input
                        id="allSubcategories"
                        type="checkbox"
                        label="All"
                        onChange={() => onSubcategoryFilterChange("ALLSUBCATEGORIES")}
                        checked={
                          filters.activeSubcategoryFilters.length === filters.subcategoryFilterList.length
                        }
                      />
                      <label htmlFor="allSubcategories">All Subcategories</label>
                    </div>
                    {renderSubcategoryFilters()}
                  </Grid>
                </Card>
                
              </Container>
            </div>
          </div>

          <div className={classes.products}>
            <Typography align="center" color="textPrimary" gutterBottom variant="h6">
              Select an NFT to view
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {renderWidgetList()}
              </Grid>
            </Container>
          </div>
        </div>

      </main>
    </div>
  );
}
