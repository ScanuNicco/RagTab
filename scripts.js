/*
    This file is part of RagTab.

    RagTab is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    RagTab is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with RagTab. If not, see <https://www.gnu.org/licenses/>.
*/

var background = chrome.extension.getBackgroundPage();
const BACKGROUNDS_CONFIG_URL = chrome.runtime.getURL('backgrounds.json');
const WEATHER_CONFIG_URL = chrome.runtime.getURL('weather.json');
const ENGINES_CONFIG_URL = chrome.runtime.getURL('engines.json');
var refresh;
var settings;
const DEFAULT_SETTINGS = {todo: {enabled: TODO_ENABLED, url: TODO_URL}, weather: {enabled: WEATHER_ENABLED, location: WEATHER_LOCATION, autoRefresh: AUTO_REFRESH, refreshInterval: AUTO_REFRESH_INTERVAL}, searchEngine: SEARCH_ENGINE, countdown: {enabled: COUNTDOWN_ENABLED, timeStamp: COUNTDOWN_TIME, title: COUNTDOWN_TITLE}, wildfires: CALIFORNIA_WILDFIRES, clock: {militaryTime: MILITARY_TIME, seconds: CLOCK_SECONDS}};
window.onload = async function() {
        await loadSettings();
        setup();
};

async function setup() {
        runClock();
        setInterval(runClock, 1000);
        if (typeof webVersion === "undefined") {
                webVersion = false;
        }
        setupBackground();
        setupSearch();
        populateSettings();
        document.getElementById("refreshButt").addEventListener("click", getWeather);
        if (settings.weather.enabled) {
                get("weatherbox").style.display = "inline-block";
                get("refreshButt").style.display = "inline-block";
                getWeather();
                if(settings.weather.autoRefresh){
                        refresh = setInterval(getWeather, (settings.weather.refreshInterval * 60000));
                }
        } else {
                get("weatherbox").style.display = "none";
                get("refreshButt").style.display = "none";
                get("fireBox").style.display = "none";
        }
        document.getElementById("todoButt").addEventListener("click", function() {
                var todo = document.createElement("iframe");
                todo.id = "todo";
                todo.src = settings.todo.url;
                document.body.appendChild(todo);
        });

        if (!settings.todo.enabled) {
                document.getElementById("todoButt").style.display = "none";
        } else {
                get("todoButt").style.display = "block";
        }
        if (!settings.countdown.enabled) {
                get("countdownBox").style.display = "none";
        } else {
                get("countdownBox").style.display = "block";
        }
}

function runClock() {
        var d = new Date();
        var nhour = d.getHours();
        var nmin = d.getMinutes();
        var seconds = d.getSeconds();
        var ap;
        if(settings.clock.militaryTime) {
                ap = "";
        } else if (nhour == 0) {
                ap = " AM";
                nhour = 12;
        } else if (nhour < 12) {
                ap = " AM";
        } else if (nhour == 12) {
                ap = " PM";
        } else if (nhour > 12) {
                ap = " PM";
                nhour -= 12;
        }

        if (nmin <= 9) nmin = "0" + nmin;
        if(!settings.clock.seconds){
                seconds = "";
        } else if (seconds <= 9) {
                seconds = ":0" + seconds;
        } else {
                seconds = ":" + seconds;
        }

        document.getElementById('clockbox').innerText = "" + nhour + ":" + nmin + seconds + ap + "";
        if (settings.countdown.enabled) {
                var count = new Date(settings.countdown.timeStamp);
                var difference = count.getTime() - d.getTime();

                var days = Math.floor(difference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((difference % (1000 * 60)) / 1000);

                document.getElementById("countTitle").innerText = settings.countdown.title;
                if (difference > 0) {
                        document.getElementById("countdown").innerHTML = `${days}<units>d</units> ${hours}<units>h</units> ${minutes}<units>m</units> ${seconds}<units>s</units>`;
                } else {
                        document.getElementById("countdown").innerHTML = "0 <units>Seconds</units>";
                }
        }
}

async function loadJSON(url){
        const response = await fetch(url);
        return await response.json();
}

var weatherCode = 113; //Default to sunny
async function getWeather() {
        document.getElementById("temp").innerText = "--";
        document.getElementById("location").innerText = "--";
        try {
                var weather = await loadJSON('https://wttr.in/' + settings.weather.location + '?format=j1');
        } catch {
                get("location").innerText = "An Error Occured.";
                get("icon").src = "Icons/error.svg";
                return;
        }
        weatherCode = weather.current_condition[0].weatherCode;
        document.getElementById("temp").innerHTML = parseInt(weather.current_condition[0].temp_F) + "&#176;";
        document.getElementById("location").innerText = weather.nearest_area[0].areaName[0].value + ", " + weather.nearest_area[0].region[0].value;
        var iconsFile = await loadJSON(WEATHER_CONFIG_URL);
        var icons = iconsFile.condition;
        for (i = 0; i < icons.length; i++) {
                if (icons[i].code == weatherCode) {
                        document.getElementById("icon").src = "Icons/" + icons[i].icon;
                        document.getElementById("weatherInfo").innerText = icons[i].description;
                }
        }
        if (settings.wildfires && weather.nearest_area[0].region[0].value == "California") {
                //If the user is in California and CALIFORNIA_WILDFIRES is set to true
                showFires( weather.nearest_area[0].longitude, weather.nearest_area[0].latitude);
        } else {
                document.getElementById("fireBox").style.display = "none";
        }
}

async function setupBackground() {
        var backgrounds = await loadJSON(BACKGROUNDS_CONFIG_URL);
        var selected = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        document.body.style.backgroundImage = "url('" + selected.url + "')";
        document.getElementById("backgroundCaption").innerText = selected.caption;
        document.getElementById("backgroundAuthor").innerText = "Taken by: " + selected.author;
}

var searchEngineURL = "https://duckduckgo.com?q=";
var engines;
async function setupSearch() {
        engines = await loadJSON(ENGINES_CONFIG_URL);
        for(var i = 0; i < engines.length; i++){
                var opt = document.createElement("OPTION");
                opt.value = i;
                opt.innerText = engines[i].name;
                get("searchSelect").appendChild(opt);
        }
        searchEngineURL = engines[settings.searchEngine].url;
        document.getElementById("search").placeholder = "Search with " + engines[settings.searchEngine].name;
}

document.getElementById("duckButt").addEventListener("click", duck); // If the "Go" button is clicked, trigger the duck() function to start the search
document.getElementById("search").addEventListener("keyup", function(event) {
        // Key code 13 is enter, trigger the search if it is pressed
        if (event.keyCode == 13) {
                duck();
        }
});

function duck() {
        var term = document.getElementById("search").value;
        location.href = searchEngineURL + term;
}

async function showFires(userLongitude, userLatitude) {
        get("fireBox").style.display = "block";
        var fires = await loadJSON('https://www.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=false', showFires);
        if (fires.length > 1) {
                var closestFire = 0;
                var closestFireDist = 1000.0;
                for (var i = 0; i < fires.length; i++) {
                        var latDiff = Math.abs(userLatitude - fires[i].Latitude); //Get the difference in longitude in lattitude
                        var longDiff = Math.abs(userLongitude - fires[i].Longitude);
                        var thisDist = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(longDiff, 2)); //Use the pythagorean theorum to get the overal distance
                        if (thisDist < closestFireDist) {
                                //This fire is our new closest fire
                                closestFire = i;
                                closestFireDist = thisDist;
                        }
                }
                document.getElementById("fireName").innerText = fires[closestFire].Name;
                document.getElementById("fireURL").href = fires[closestFire].Url;
                if (fires[closestFire].Location.toLowerCase().includes("county")) { //Don't append the county if the Location string already specifies it.
                        document.getElementById("fireLocation").innerText = fires[closestFire].Location;
                } else {
                        document.getElementById("fireLocation").innerText = fires[closestFire].Location + " in " + fires[closestFire].County + " county.";
                }
                if (fires[closestFire].ControlStatement != null && fires[closestFire].ControlStatement != "") {
                        document.getElementById("fireContainment").innerText = fires[closestFire].ControlStatement;
                } else if (fires[closestFire].PercentContained != null && fires[closestFire].PercentContained != "") {
                        document.getElementById("fireContainment").innerText = fires[closestFire].PercentContained + "% Contained.";
                } else {
                        document.getElementById("fireContainment").innerText = "No containment information";
                }
        } else {
                //Yay! There are no wildfires in California!
                document.getElementById("fireBox").style.display = "none";
        }
}

document.getElementById("settingsB").onclick = openSettings;
function openSettings() {
        document.getElementById("settings").style.top = "0px";
        document.getElementById("settings").style.opacity = "1";
}

document.getElementById("closeSettings").onclick = closeSettings;
get("resetSettings").onclick = resetSettings;
function closeSettings() {
        saveSettings();
        document.getElementById("settings").style.top = "100vh";
        document.getElementById("settings").style.opacity = "0";
}

function populateSettings() {
        get("version").innerText = browser.runtime.getManifest().version;
        get("enableTodo").checked = settings.todo.enabled;
        get("todoURL").value = settings.todo.url;
        get("enableWeather").checked = settings.weather.enabled;
        get("weatherLoc").value = settings.weather.location;
        get("enableRefresh").checked = settings.weather.autoRefresh;
        get("refreshInt").value = settings.weather.refreshInterval;
        get("enableFires").checked = settings.wildfires;
        get("enableCount").checked = settings.countdown.enabled;
        get("countTitleInput").value = settings.countdown.title;
        var when = new Date(settings.countdown.timeStamp);
        when.setMinutes(when.getMinutes() - when.getTimezoneOffset());
        get("countTime").value  = when.toISOString().slice(0,16);
        get("searchSelect").value = settings.searchEngine;
        //The actual <select> elements are created inside of setupSearch()
        get("secondsBox").checked = settings.clock.seconds;
        get("24Box").checked = settings.clock.militaryTime;
}

function get(name){ //Alias for document.getElementById so I don't have to type it so much
        return document.getElementById(name);
}

function saveSettings() {
        settings.todo.enabled = get("enableTodo").checked;
        settings.todo.url = get("todoURL").value;
        settings.weather.enabled = get("enableWeather").checked;
        settings.weather.location = get("weatherLoc").value;
        settings.weather.autoRefresh = get("enableRefresh").checked;
        settings.weather.refreshInterval = parseInt(get("refreshInt").value);
        settings.wildfires = get("enableFires").checked;
        settings.countdown.enabled = get("enableCount").checked;
        settings.countdown.title = get("countTitleInput").value;
        settings.countdown.timeStamp = new Date(get("countTime").value).getTime();
        settings.searchEngine = parseInt(get("searchSelect").value);
        settings.clock.seconds = get("secondsBox").checked;
        settings.clock.militaryTime = get("24Box").checked;
        chrome.storage.sync.set({"settings": settings}, function() {
                console.log("Saved Settings!");
        });
        setup();
}

async function loadSettings() {
        var savedSettings = await new Promise((resolve, reject) => {
                chrome.storage.sync.get("settings", function(result) {
                        resolve(result.settings);
                });
        });
        if(savedSettings != null && savedSettings != undefined){
                settings = savedSettings;
        } else {
                settings = DEFAULT_SETTINGS;
        }
}

function resetSettings()  {
        settings = DEFAULT_SETTINGS;
        populateSettings();
}
