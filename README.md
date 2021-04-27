## VarrockGE Project 


VarrockGE is a full stack web application built with React, Express, and PostgresSQL that allows users to buy, sell, and collect video game collectibles. 

This project was completed by [Jesse Mcdermott](https://github.com/mcdermottjesse), [Ray Yiu](https://github.com/rayyiu), & [Gio Wan](https://github.com/gwan93) for the final project at Lighthouse Labs.

[Hosted on Heroku](https://varrockge-gw.herokuapp.com/) - Please wait 30-60 seconds for the Heroku server to start up after clicking the link.

## Features

- Users can buy and sell video game collectibles.
- When a video game collectible is bought by a user, it is removed from the marketplace
- The purchase history of a video game collectible is updated when it is purchased from the marketplace
- Users can sell video game collectibles that they own on the marketplace where they can set their own asking price
- Users can create and edit collections that contain their video game collectibles
- Admins can create new video game collectibles

## Project Setup

1. Fork this repository, then clone your fork of this repository.
2. Create the `.env` in the root of the directory by using `.env.example` as a reference. The `.env` file should have the following content:
   ```shell
   CHOKIDAR_USEPOLLING=true
   REACT_APP_API_URL=https://varrockge-api-gw.herokuapp.com
   ```
3. Install all dependencies:
   ```shell
   npm install
   ```

4. Start the web server using:
     ```shell
     npm start
     ```
5. Open your web browser and enter the default URL:
     ```browser
     http://localhost:<your port number>/
     ```
6. When finished, the server can be safely shut down with `control + c`.

## Final Product

!['Marketplace'](https://github.com/gwan93/varrockge-frontend/blob/master/docs/marketplace.png?raw=true)
<br>

!['Product Details'](https://github.com/gwan93/varrockge-frontend/blob/master/docs/nft-preview.png?raw=true)
<br>

!['User Page'](https://github.com/gwan93/varrockge-frontend/blob/master/docs/user-page.png?raw=true)
<br>

!['Collection Page'](https://github.com/gwan93/varrockge-frontend/blob/master/docs/collection.png?raw=true)
****

## Future Development

- Search bar functionality
- Stripe checkout
- Subtract funds from user's account upon checkout
- Implement lootboxes for users to acquire random video game collectibles
- Host images
- YouTube video support to purchase video game moments
- Blockchain functionality
- Allow users to delete collections

## Known Bugs/Issues

- When a video game collectible is sold on the marketplace, it is not removed from their collections
- Users are able to add video game collectibles to their cart that they already own

## Dependencies


- React 17.0.2 or above
- React Router DOM 5.2 or above
- Material UI 4.11.2 or above
- dotenv 8.2.0 or above