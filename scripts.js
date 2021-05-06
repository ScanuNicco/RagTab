function GetClock() {
	var d = new Date();
	var nhour = d.getHours(),
		nmin = d.getMinutes(),
		ap;
	if (nhour == 0) {
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

	document.getElementById('clockbox').innerHTML = "" + nhour + ":" + nmin + ap + "";
	if(COUNTDOWN_ENABLED){
		var count = new Date(COUNTDOWN_TIME);
		var difference = count.getTime() - d.getTime();
		
		//The following calcualtions may have been borrowed from w3schools because i'm lazy
		var days = Math.floor(difference / (1000 * 60 * 60 * 24));
		var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((difference % (1000 * 60)) / 1000);
		
		document.getElementById("countTitle").innerText = COUNTDOWN_TITLE;
		if(difference > 0){
			document.getElementById("countdown").innerHTML = `${days}<units>d</units> ${hours}<units>h</units> ${minutes}<units>m</units> ${seconds}<units>s</units>`;
		} else {
			document.getElementById("countdown").innerHTML = "0 <units>Seconds</units>";
		}
	}
}

var refresh;
window.onload = function () {
	GetClock();
	setInterval(GetClock, 1000);
	httpGetAsync(chrome.runtime.getURL('backgrounds.json'), setupBackground);
	getWeather();
	document.getElementById("refreshButt").addEventListener("click", getWeather);
	if(WEATHER_ENABLED && AUTO_REFRESH){
		refresh = setInterval(getWeather, (AUTO_REFRESH_INTERVAL * 60000));
	}
	httpGetAsync(chrome.runtime.getURL('engines.json'), setupSearch);
	if(!COUNTDOWN_ENABLED){
		document.getElementById("countdownBox").style.display = "none";
	}
}

function getWeather(){
	document.getElementById("temp").innerHTML = "--";
	document.getElementById("location").innerHTML = "--";
	if(WEATHER_ENABLED){
		httpGetAsync('https://wttr.in/' + WEATHER_LOCATION + '?format=j1', showWeather);
	} else {
		document.getElementById("weatherCont").style.display = "none";
	}
}

function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	xmlHttp.send(null);
}

function setupBackground(result){
	var backgrounds = JSON.parse(result);
	var selected = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	document.body.style.backgroundImage = "url('" + selected.url + "')";
	document.getElementById("backgroundCaption").innerText = selected.caption;
	document.getElementById("backgroundAuthor").innerText = "Taken by: " + selected.author;
}

var weatherCode = 113; //Default to sunny
function showWeather(result) {
	var weather = JSON.parse(result);
	weatherCode = weather.current_condition[0].weatherCode;
	document.getElementById("temp").innerHTML = weather.current_condition[0].temp_F + "&#176;";
	document.getElementById("location").innerHTML = weather.nearest_area[0].areaName[0].value + ", " + weather.nearest_area[0].region[0].value;
	httpGetAsync(chrome.runtime.getURL('weather.json'), showIcon);
}

function showIcon(result){
	var icons = JSON.parse(result).condition;
	for(i = 0; i < icons.length; i++){
		if(icons[i].code == weatherCode){
			document.getElementById("icon").src = "Icons/" + icons[i].icon;
			document.getElementById("weatherInfo").innerText = icons[i].description;
		}
	}
}

var searchEngineURL = "https://duckduckgo.com?q=";
function setupSearch(result){
	var engines = JSON.parse(result);
	searchEngineURL = engines[SEARCH_ENGINE].url;
	document.getElementById("search").placeholder = "Search with " + engines[SEARCH_ENGINE].name;
}

document.getElementById("duckButt").addEventListener("click", duck);// If the "Go" button is clicked, trigger the duck() function to start the search
document.getElementById("search").addEventListener("keyup", function (event) {
            // Key code 13 is enter, trigger the search if it is pressed
            if (event.keyCode == 13) {
                duck();
            }
        });
function duck(){
	var term = document.getElementById("search").value;
	location.href = searchEngineURL + term;
}

document.getElementById("todoButt").addEventListener("click", function(){
	var todo = document.createElement("iframe");
	todo.id = "todo";
	todo.src = TODO_URL;
	document.body.appendChild(todo);
});

if(!TODO_ENABLED){
	document.getElementById("todoButt").style.display = "none";
}
