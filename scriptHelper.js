require('cross-fetch/polyfill');

async function myFetch() {
    const response = await fetch('https://handlers.education.launchcode.org/static/planets.json');
    return response.json();
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

     document.getElementById("missionTarget").innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
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

    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Piolt and Copilot names must be text!");
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
    list.style.visibility = "visible";
    return list;
} else {
    faultyItems.style.visibility = "visible";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
}
}


 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;