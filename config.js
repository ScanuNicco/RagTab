//Whether the to-do list is enabled or not.
const TODO_ENABLED = true; //Default Value: true

//The webpage displayed when the todo list is open. You could change this to something like evernote, a calender website, or even an online game if you want to be sneaky. For privacy and performance reasons, this webpage is not loaded until the to-do button is clicked
const TODO_URL = "https://scanuproductions.com/webtools/To-Do/?embedded=true&transparent=true"; //Default Value: "https://scanuproductions.com/webtools/To-Do/?embedded=true&transparent=true"

//Whether the weather widget is enabled or not. Weather data is retrieved from wttr.in. If you are concerned about privacy you can disable the widged to prevent your new-tab page from connecting to wttr.in.
const WEATHER_ENABLED = true; //Default Value: true

//What location to provide to wttr.in when getting weather data. If left blank, wttr.in will use your current location. Example Values: "london", "iowa-city", "48.8755546,-87.6244212"
const WEATHER_LOCATION = ""; //Default Value: ""

//Whether the weather widget will refresh automatically. This has no effect if WEATHER_ENABLED is set to false.
const AUTO_REFRESH = true; //Default Value: true

//How often (in minutes) the weather widget will refresh. This has no effect if AUTO_REFRESH is set to false.
const AUTO_REFRESH_INTERVAL = 15;//Default Value: 15

//What search engine to use. Search engines are defined in engines.json. 0 is DuckDuckGo, 1 is Google, 2 is Wikipedia
const SEARCH_ENGINE = 0; //Default Value: 0

//Whether the countdown widget is enabled
const COUNTDOWN_ENABLED = true; //Default Value: false

//The time that the countdown widget is counting down to. Can be any format that the JavaScript Date() object takes.
const COUNTDOWN_TIME = "Jun 11, 2021 15:10:00"; //Default Value: "Dec 17, 2021 12:00:00" (The release date of the next spider man movie)

//The title that is displayed on the widget.
const COUNTDOWN_TITLE = "No More Weverka EVER In:"; //Default Value: "Spider-Man Releases In:"
