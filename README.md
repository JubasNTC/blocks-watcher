## Blocks watcher

### About application

1) A service that stores transaction information in Postgres in the background in all blocks starting from 9842805 (in real time, that is, the service constantly updates the database with the release of new blocks).
<br>
2) API service with an endpoint that issues an address whose balance has changed more than the others (in absolute value) over the last 100 blocks.

### Required software
For the application to work correctly, you need to install the following software:
```
node.js && npm
postgresql
```

### Pre-setup

Сreate a .env file in the root directory and fill in your data in it, following the example below.
```
DB_USERNAME=YOUR_POSTGRES_USERNAME
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_NAME=blocks-watcher
DB_HOST=127.0.0.1
PORT=8000
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
ETHERSCAN_API_URL=https://api.etherscan.io/api
```
Run the following command in terminal to install the project dependencies:
```
npm i
```

To create a database and perform migrations, run the following commands in terminal:
```
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
```

### Local launch

To run locally, run the following two commands in order in different terminals:
```
npm run worker
npm start
```

To run the api in development mode, use the following command:
```
npm run dev
```

### Supported endpoints

Endpoint that issues an address whose balance has changed more than the others (in absolute value) over the last 100 blocks.
```
http://localhost:8000/api/balance-changed-most
```
