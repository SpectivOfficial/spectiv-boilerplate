# Spectiv Boiler Plate

Boiler plate using
  - React/Redux
  - Node/Express
  - Sequelize/PostgreSQL
  - Sass

## Getting Started

### Prerequisites

- [Node JS](http://nodejs.org)
- [NPM](http://npmjs.com)
- [PostgreSQL](https://www.postgresql.org/)

### Setup

```sh
$ git clone https://github.com/SpectivOfficial/boiler-plate
```

```sh
$ npm install
```

- Create ```.env``` file on the root directory of the boiler plate and add the following
  - PORT
  - NODE_ENV

- To add database add the following to the ```.env``` file
  - POSTGRES_DATABASE
  - POSTGRES_USERNAME
  - POSTGRES_PASSWORD
  - POSTGRES_HOST
  - POSTGRES_PORT
  - Uncomment everything in ```models/index.js``` and ```server/index.js```

- To add authentication add the following to the ```.env``` file
  - PASSPORT_SECRET
  - REDDIS_CONNECTION_STRING
  - Uncomment everything in ```server/app.js``` and complete ```config/passport.js```

### Develop

```sh
$ npm start
```

Browse to the port and you should see a green page

The boiler plate is set up with Sass which you can modify in ```client/styles```

### Production

```sh
$ npm production
```

It will create a ```/dist``` folder

## Style Guide

This boiler plate follows [Airbnb's](https://github.com/airbnb/javascript/tree/master/react) style guide for React

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/).
  1. Create a branch
  2. Add commits
  3. [open a pull request](https://github.com/fraction/readme-boilerplate/compare/) for a review.
