# Web Client

## Installation

### node:
1. instal node on computer: https://docs.npmjs.com/getting-started/installing-node

### git:
1. install git on computer: https://www.atlassian.com/git/tutorials/install-git
2. clone git project (run in terminal): git clone <project_url_from_bitbucket>

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
    "webClientConfig": {
      "host": "CLIENT_HOST",
      "port": CLIENT_PORT,
      "protocol": "PROTOCOL_TYPE",
      "apiEndpoint": "{PROTOCOL_TYPE}://{SERVER_HOST}:{SERVER_PORT}/api",
      "stateFBLogin": "SOME_IDENTIFIER_FOR_FB_LOGIN",
      "fbLoginUrl": "FB_LOGIN_URL",
      "googleLoginUrl": "FB_LOGIN_URL",
      "stateGoogleLogin": "SOME_IDENTIFIER_FOR_GOOGLE_LOGIN"
    }
  }
}
```