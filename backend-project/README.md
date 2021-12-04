## Installation

```bash
$ npm install
```

## Env adjustment
copy .env.example to .env and set you correct values.

## Config adjustment
copy config/config.example.json to config/config.json and set your correct values.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Add default categories
```bash
npx sequelize-cli db:seed:all
```

## APIs
```bash
# Register
/users/register

# Login (generate token by username and password)
/users/login

# check if token is valid
/users/token
```