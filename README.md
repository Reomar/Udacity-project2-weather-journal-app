# Udacity Weather-Journal App Project

### Overview
This is project #2 for the egyptFWD web Professional Track, which is an asynchronous web app that uses Web API and user data to dynamically update the UI.

------------
###How it works:
1. `app.js` fires up when the generate button is clicked.
2. A check is done in the input fileds to insure that there is a value.
3. Date is generated using `getDate()`
4. temperature is bought from [openweathermap.org Current weather data API.](https://openweathermap.org/current "openweathermap.org Current weather data API")
5. The user data (date, temp, feelings) is sent to `server.js` which have routers to receive POST requests .
6. The UI then updates using `updateUI()`, which update UI using data from `server.js` which have routers to receive GET requests.

