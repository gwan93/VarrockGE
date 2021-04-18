import { authContext } from "../AuthProvider";
import React, { useContext, useState } from "react";
import axios from "axios";

export default function Cart() {
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
      <div>
        <ul>
          <li key={`${widget.widget_id}_name`}>Name: {widget.name}</li>
          <li key={`${widget.widget_id}_current_sell_price_cents`}>
            Current_sell_price_cents: {widget.current_sell_price_cents}
          </li>
          <li key={`${widget.widget_id}_description`}>
            Description: {widget.description}
          </li>
          <li key={`${widget.widget_id}_for_sale_by_owner`}>
            For_sale_by_owner: {widget.for_sale_by_owner}
          </li>
          <li key={`${widget.widget_id}_hash_`}>hash:{widget.hash}</li>
          <li key={`${widget.widget_id}_msrp_cents`}>
            MSRP_cents: {widget.msrp_cents}
          </li>
          <li key={`${widget.widget_id}_rarity_id`}>
            Rarity_id: {widget.rarity_id}
          </li>
          <li key={`${widget.widget_id}_subcategory_id`}>
            Subcategory_id: {widget.subcategory_id}
          </li>
          <li key={`${widget.widget_id}_widget_id`}>widget_id: {widget.id}</li>
        </ul>
      </div>
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

  const emptyCart = (state) => {
    console.log("emptying cart");
    setState((prev) => ({
      ...prev,
      itemsInCart: [],
    }));
  };

  const checkout = (state, cartItemDetails) => {
    console.log('transferring ownership of items');
    // console.log('state.user.id', state.user.id);
    console.log('cartItemDetails', cartItemDetails)

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

    console.log('postObject', postObject);

    // Submit that array along with the post request
    axios
      .post(`/widgets/checkout`, postObject)
      .then((response) => {
        console.log('in response', response)
        setCheckoutSuccess(true);
        if (response.status === 200) {
          emptyCart(state);
        }
      })
      .catch((err) => console.log("Error purchasing", err));
  };

  return (
    <div>
      {checkoutSuccess && <h2>Thank you for your purchase!</h2>}

      <h2>Cart</h2>

      {itemsInCart.length !== 0 && showWidgets}
      {itemsInCart.length !== 0 && <h2>Total: ${cartSubtotal / 100}</h2>}
      {itemsInCart.length !== 0 && (
        <button onClick={() => checkout(state, cartItemDetails)}>
          Check Out
        </button>
      )}

      {itemsInCart.length === 0 && <h2>No items in cart.</h2>}
    </div>
  );
}
