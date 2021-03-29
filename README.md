# Node.js Express API test app

> Node.js 
>
> Express 
> 
> API
> 
> TypeScript 3
> 
> MongoDB

### Project Introduction
- support ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Features
##### Authentication:
- jwt authentication
##### Storage:
- MongoDB

## Requirements

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## Installation

Then install libraries:

```bash
npm npm i
```

## Running the API
### Development
To start the application in development mode, run:

Start the application in dev env:
```
nodemon
```
Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

Routes:
```
/login
/signup
/logout
/info
/latency
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.


