import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { authContext } from "../AuthProvider";
import {
  Typography,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://dw.convertfiles.com/files/0011087001619042393/circuitboard.gif)`,
    backgroundPosition: "center center",
    height: '100vh'
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "none",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    outline: "none",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#56144D",
    },
  },
}));

export default function Admin(props) {
  const classes = useStyles();
  const { setState } = useContext(authContext);
  const [name, setName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [rarityID, setRarityID] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");

  //updating input fields to create new widget
  const onCreateName = function (event) {
    setName(event.target.value);
    console.log("name", name);
  };

  const onCreateRarity = function (event) {
    setRarityID(event.target.value);
  };

  const onCreateCategory = function (event) {
    setCategoryID(event.target.value);
  };

  const onCreateDescription = function (event) {
    setDescription(event.target.value);
  };

  const onCreateCost = function (event) {
    setCost(event.target.value * 100);
  };

  const onCreateImage = function (event) {
    setImage(event.target.value);
  };

  //things to add to the widget once submitted
  const formInfo = { name, categoryID, description, rarityID, cost, image };
  const onSubmit = function (event) {
    event.preventDefault();
    createWidget(formInfo);
  };

  //items that will be added to the widgets db
  const createWidget = function () {
    axios
      .post("/widgets", {
        name,
        categoryID,
        description,
        rarityID,
        cost,
        image,
      })
      .then((response) => {
        setState((prev) => ({
          ...prev,
          widgets: [...prev.widgets, response.data],
        }));
        console.log("Added successfully");
        console.log("response", response);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <main className={classes.main}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" class="login">
          Admin
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nftName"
                variant="outlined"
                required
                fullWidth
                id="nftName"
                label="NFT Title"
                onChange={onCreateName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="category"
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Category No."
                onChange={onCreateCategory}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="rarity"
                variant="outlined"
                required
                fullWidth
                id="rarity"
                label="Rarity No."
                onChange={onCreateRarity}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cost"
                variant="outlined"
                required
                fullWidth
                id="cost"
                label="Cost"
                onChange={onCreateCost}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                onChange={onCreateDescription}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                variant="outlined"
                required
                fullWidth
                id="imageUrl"
                label="Image URL"
                onChange={onCreateImage}
                autoFocus
              />
            </Grid>
          </Grid>
              
              <Button
                
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { alert('💯 NFT Added Successfully 🔥'); }}
              >
                Create NFT
              </Button>
        </form>
      </div>
    </Container>
    </main>
  );
}
