
require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

     document.getElementById("missionTarget").innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name:Saturn/Titan</li>
                     <li>Diameter:5149.5km</li>
                     <li>Star:Sol</li>
                     <li>Distance from Earth:1.4billionkmfromEarth</li>
                     <li>Number of Moons:0</li>
                 </ol>
                 <img src="https://solarsystem.nasa.gov/system/resources/detail_files/16278_PIA20016.jpg">
    `;
}

 function validateInput(input) {
    if (input === "") {
        return "Empty";
    } else if (isNaN(input)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    
    
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
        return;}

    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel Level and Cargo Mass must be numbers!");
        return;}

 pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
 copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;


 let fuelReady = true;
 let cargoReady = true;

 if (fuelLevel < 10000) {
     fuelReady = false;
     fuelStatus.innerHTML = "Fuel level too low for launch";
 } else {
     fuelStatus.innerHTML = "Fuel level high enough for launch";
 }

 if (cargoLevel > 10000) {
     cargoReady = false;
     cargoStatus.innerHTML = "Cargo mass too heavy for launch";
 } else {
     cargoStatus.innerHTML = "Cargo mass low enough for launch";
 }

 
 if (fuelReady && cargoReady) {
    faultyItems.style.visibility = "hidden";
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
} else {
    faultyItems.style.visibility = "visible";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
}
}

 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json(); 
    });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];

 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;