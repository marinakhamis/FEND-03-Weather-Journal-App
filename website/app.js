
// Set Global variables */
const dataBox = document.querySelector(".upper-box");

// Set Base URL and API Key
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=5a69172b4bf5786b121ed4101f0c782d ";

// Get the date
let date = new Date();
let newDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();

// Add Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", takeAction);


//Function called by event listener 
function takeAction(x) {
  x.preventDefault();
  // get user input values
  const addZip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getWeatherUpdate(baseURL, addZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData("/add", { date: newDate, temp: userData.main.temp, content });
    })
    .then(function (UpdatedData) {
      // call newUI to update browser content
      newUI();
    });
}

// Function to GET Web API Data
const getWeatherUpdate = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to POST data 
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });

  try {
    const UpdatedData = await req.json();
    return UpdatedData;
  } catch (error) {
    console.log(error);
  }
};


const newUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    // update new entry values
    document.querySelector("#date").innerHTML = "Date: " + allData.date;
    document.querySelector("#temp").innerHTML= "Temprature: " + allData.temp + " Kelvin"; 
    document.querySelector("#content").innerHTML ="Feeling: " + allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};

//To change the Theme of the webPage according to the Temprature :D <3
/*
function updateTheme(){
  let tempForUI = Number(document.querySelector("#temp").innerHTML); 
  let themeStylesheet = document.getElementById("default-css");
  if(tempForUI < 183 ){
  console.log("Where do u live ? Antarctica !");
} 
  else if( 184 < tempForUI <= 273){
  console.log("It's Sooo Cold");

} 
  else if( 274 < tempForUI <= 293){
  console.log("It's a lovely day !");

} else if( 294 < tempForUI <= 373){
  console.log("Hot day! don't forget to drink water");
} 
  else {
  console.log("Do you live on anothr planet ??");
}

}
updateTheme();
*/
