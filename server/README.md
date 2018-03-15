# Server


## Installation

### node:
1. instal node on computer: https://docs.npmjs.com/getting-started/installing-node

### mongo (optional):
1. install mongo on computer
2. add <path to mongo dir> /bin to PATH in enviromental variables
3. run in terminal: mongod --dbpath=<path to data> --logpath=<path to data>\mongo.log --install

### git:
1. install git on computer: https://www.atlassian.com/git/tutorials/install-git
2. clone git project (run in terminal): git clone <project_url_from_bitbucket>

### redis:
1. install redis on computer

### install project dependencies:
1. navigate to project directory in terminal
2. run in terminal: npm install 


## Build

### code compilation
1. navigate to project directory in terminal
2. run in terminal: npm run build
3. run in terminal: export NODE_CONFIG_DIR=<path to config dir> (or add to enviroment variables)
4. run in terminal: export NODE_ENV=local (or add to enviroment variables)

### run app
1. navigate to project directory in terminal
2. run in terminal: npm start


## Configuration file structure 


configDir/dev.json
```json
{
  "PROJECT_NAME": {
    "dbConfig": {
      "host": "DB_HOST",
      "port": DB_PORT,
      "dbName": "DB_NAME",
      "fullPath": "mongodb://{DB_HOST}:{DB_PORT}/{DB_NAME}"
    },
    "serverConfig": {
      "host": "SERVER_HOST",
      "port": SERVER_PORT,
      "protocol": "PROTOCOL_TYPE",
      "whitelist": [WHITELIST_HOSTS],
      "sessionSecret": "SESSION_SECRET",
      "sessionTTL": SESSION_TTL,
      "redisPort": REDIS_PORT,
      "redisHost": "REDIS_HOST",
      "redirectUrl": "REDIRECT_URL",
      "socialLoginGenericPassword": SOME_PASSWORD,
      "fbAppId": FB_APP_ID,
      "fbAppSecret": "FB_APP_SECRET",
      "fbAccessTokenReqUrl": "FB_ACCESS_TOKEN_EXCHANGE_URL",
      "fbGetUserProfileUrl": "FB_USER_PROFILE_URL",
      "googleAppId": "GOOGLE_APP_ID",
      "googleAppSecret": "GOOGLE_APP_SECRET",
      "googleAccessTokenReqUrl": "GOOGLE_ACCESS_TOKEN_EXCHANGE_URL",
      "googleGetUserProfileUrl": "GOOGLE_USER_PROFILE_URL"
    }
  }
}
```