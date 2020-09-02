/* Global Variables */
const zipcodeInput = document.querySelector('#zip');
const feelingsInput = document.querySelector('#feelings');
const dateEntry = document.querySelector('#date-entry');
const tempEntry = document.querySelector('#temp-entry');
const feelEntry = document.querySelector('#content-entry')
const button = document.querySelector('#generate')


// When the generate button is  clicked
button.addEventListener('click', ()=>{

    // Get the values of the inputs
    const zipcode = zipcodeInput.value;
    const feelings = feelingsInput.value;

    // Check that the inputs has a value
    // If it do not have a value, promt the user to enter one
    if(!zipcode){
        alert('Please enter a zip code')
        return false

    }else if(!feelings){
        alert('Please describe how do you feel')
        return false
    }

    // Get the current date
    const date = getDate(); // Line 53

    /**
     * Get the current temp from openweathermap.org's Current weather data API
     * And post the data to our server
     * And update the UI using data saved to the server
    **/
    getTemp(zipcode) // Line 64
        .then( (temp) =>{

            // Send user data(date, temp, feelings) to server
            postData('/postData' ,{date: date, temp: temp , feel: feelings}); // Line 91
        })
        .then( () => {

            // Get the data from the server & update UI
            updateUi(); // Line 107

        })
});

/**
 *  Create a new date instance dynamically with JS
**/
function getDate(){
    let d = new Date();
    let newDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

    return newDate;
}

/**
 * Gets the current temp from openweathermap.org
 *  Current weather data API
**/
async function getTemp(zipcode, date, feelings){

    // API Credentials
    const key = '1a61767de1b71b63cb9dd337e7bc82d3';
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=metric&appid=${key}`;

    // GET data from API
    const response = await fetch(url);

    // Try to return temp data from API,
    // If failed, promt the user to enter valid zipcode
    try {
        let newData = await response.json();

        let temp = Math.round(newData.main.temp);

        return temp;

    }catch(error) {
      console.log("error", error);
      alert('Please check that you zip code is a valid US zip code')
    }
}

/**
 * POST request to the server
**/
async function postData(url, data ={}){

    const request = fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });
}

/**
 *  update the UI using data Retrived from the server
**/
async function updateUi(){

    // Get data form the server
    const response = await fetch('/getData');

    try {
        let serverData = await response.json();

        // Update the ui
        if(serverData.temp){
            dateEntry.innerHTML = `Date: ${serverData.date}`;
            tempEntry.innerHTML = `Your current weather temperature is ${serverData.temp}°C`;
            feelEntry.innerHTML = `You feel ${serverData.feel}`;
        }

    } catch (error) {

        console.log('error', error);
    }
}