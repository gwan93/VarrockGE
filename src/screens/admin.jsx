import { useState } from "react";
import axios from "axios";

export default function Admin(props) {
  const [name, setName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [rarityID, setRarityID] = useState("");
  const [cost, setCost] = useState("");

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
    setCost(event.target.value);
  };

  //things to add to the widget once submitted
  const formInfo = { name, categoryID, description, rarityID, cost };
  const onSubmit = function (event) {
    event.preventDefault();
    createWidget(formInfo);
  };

  //items that will be added to the widgets db
  const createWidget = function () {
    axios
      .post("/widgets", { name, categoryID, description, rarityID, cost })
      .then((response) => {
        console.log("Added successfully");
        console.log("response", response);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div class="create-widget">
        <h3>Admin</h3>
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          class="form-control"
          id="nameInput"
          onChange={onCreateName}
        ></input>
      </div>
      <p>
        <div class="form-group">
          <label htmlfor="category">Category ID</label>
          <input
            type="number"
            class="form-control"
            id="category"
            onChange={onCreateCategory}
          ></input>
        </div>
      </p>
      <p>
        <div class="form-group">
          <label htmlfor="rarity">Rarity ID</label>
          <input
            type="number"
            class="form-control"
            id="rarity"
            onChange={onCreateRarity}
          ></input>
        </div>
      </p>
      <div class="form-group">
        <label htmlFor="cost">$Cost$</label>
        <input
          type="number"
          class="form-control"
          id="cost"
          onChange={onCreateCost}
        ></input>
      </div>
      <p></p>
      <div class="form-group">
        <label htmlfor="widget-description">Description</label>
        <p>
          <input
            type="text"
            class="form-control"
            id="widget-description"
            onChange={onCreateDescription}
          ></input>
        </p>
      </div>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
