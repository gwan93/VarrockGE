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
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(https://i.imgur.com/WEBV8Q1.gif)`,
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
  const [name, setName] = useState("Mewtwo & Mew");
  const [categoryID, setCategoryID] = useState(1);
  const [description, setDescription] = useState("The first generation legendaries.");
  const [rarityID, setRarityID] = useState(4);
  const [cost, setCost] = useState(49.99);
  const [image, setImage] = useState("https://64.media.tumblr.com/2c8d74ad40a09b2cf0d77e722a9c1a79/705fb6ba3c0ca419-b9/s500x750/c69dd2b6c32a589358e7bb897f027ad6d58f17e8.jpg?fbclid=IwAR04G87W6c1W-Kd0FcgNj7QecTPXaPusdOsJ2boJSs_3hjkJQYQa-OFvagw");

  //updating input fields to create new widget
  const onCreateName = function (event) {
    setName(event.target.value);
    // console.log("name", name);
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
        // console.log("Added successfully");
        // console.log("response", response);
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
          <Typography component="h1" className="login">
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
                  value={name}
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
                  value={categoryID}
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
                  value={rarityID}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cost"
                  variant="outlined"
                  required
                  fullWidth
                  id="cost"
                  label="Cost ($)"
                  onChange={onCreateCost}
                  value={cost}
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
                  value={description}
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
                  value={image}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                alert("💯 NFT Added Successfully 🔥");
                window.location.href = "/widgets";
              }}
            >
              Create NFT
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
