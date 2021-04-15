import { authContext } from '../AuthProvider';
import React, {useContext} from 'react';



export default function Cart(){
  const { state } = useContext(authContext);
  const { itemsInCart } = state;
  const stateWidgets = state.widgets;

  console.log('Cart items', itemsInCart);

  // Uses the widget data stored within state to return
  // a filtered array that consists of items only in the cart
  const stateWidgetsFiltered = stateWidgets.filter(widget => {
    return itemsInCart.includes(widget.id);
  })

  // These are the filtered widgets' details to be displayed
  const showWidgets = stateWidgetsFiltered.map(widget => {
    return (
      <div>
        <ul>
          <li key={`${widget.widget_id}_name`}>Name: {widget.name}</li>
          <li key={`${widget.widget_id}_current_sell_price_cents`}>Current_sell_price_cents: {widget.current_sell_price_cents}</li>
          <li key={`${widget.widget_id}_description`}>Description: {widget.description}</li>
          <li key={`${widget.widget_id}_for_sale_by_owner`}>For_sale_by_owner: {widget.for_sale_by_owner}</li>
          <li key={`${widget.widget_id}_hash_`}>hash:{widget.hash}</li>
          <li key={`${widget.widget_id}_msrp_cents`}>MSRP_cents: {widget.msrp_cents}</li>
          <li key={`${widget.widget_id}_rarity_id`}>Rarity_id: {widget.rarity_id}</li>
          <li key={`${widget.widget_id}_subcategory_id`}>Subcategory_id: {widget.subcategory_id}</li>
          <li key={`${widget.widget_id}_widget_id`}>widget_id: {widget.id}</li>
        </ul>
      </div>
    );
  });

  // Calculate subtotal for all the widgets in the cart
  const widgetPriceArray = [];
  stateWidgetsFiltered.map(widget => widgetPriceArray.push(widget.current_sell_price_cents))
  const cartSubtotal = widgetPriceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <div>
      <h2>Cart</h2>
      {showWidgets}
      <h2>Total: ${cartSubtotal / 100}</h2>

      {itemsInCart.length === 0 && <h2>No items in cart.</h2>}
    </div>
  );
};