const NUMBER_OF_IMAGES = 20;

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
}

window.onload = function () {
	GetClock();
	setInterval(GetClock, 1000);
	document.body.style.backgroundImage = "url('https://scanuproductions.com/images/gallery/gallery" + Math.floor((Math.random() * NUMBER_OF_IMAGES) + 1) + ".jpg')";
	httpGetAsync('https://wttr.in?format=j1', showWeather);
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

var weatherCode = 113; //Default to sunny
function showWeather(result) {
	console.log(result);
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

document.getElementById("duckButt").addEventListener("click", duck);
function duck(){
	var term = document.getElementById("search").value;
	location.href = "https://duckduckgo.com?q=" + term;
}

document.getElementById("todoButt").addEventListener("click", function(){
	console.log("test");
	var todo = document.createElement("iframe");
	todo.id = "todo";
	todo.src = "https://scanuproductions.com/webtools/To-Do/?embedded=true";
	document.body.appendChild(todo);
});