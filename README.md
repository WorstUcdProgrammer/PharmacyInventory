# Pharmacy Inventory

#### _**IMPORTANT NOTE**_ - 
This app does not contain an .env file, you need to create one yourself in the backend directory and plug in mongodb uri into it to run the backend server.

## Getting Started
To get the dependencies for frontend

Run

`$ cd frontend`

`$ npm install`

To get the dependencies for backend

Run

`$ cd backend`

`$ npm install`


## File structure
#### `frontend` - Holds the client application
- #### `public` - This holds all of static files
- #### `src`
    - #### `components` - This folder holds all of the different components that will make up views
    - #### `views` - These represent a unique page on the website i.e. Inventory or Patient. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `backend` - Holds the server application
- #### `config` - This holds configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `middleware` - This hold helper function for custom error handling
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore


## Available Scripts

In the frontend directory, you can run:

### `npm run start`

Runs the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

In the backend directory, you can run:

### `npm run start`

Runs the server app in development mode.<br>

## TODO

### In Progress

- [ ] Implementing the Overview page to visualize inventory/logging/summary by charts/graphs
- [ ] Move backend to other frameworks: .Net Entity Framework


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn React, check out the [React documentation](https://reactjs.org/).
