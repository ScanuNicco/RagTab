//The number of images in the scanuproductions.com image gallery, you don't need to change this
const NUMBER_OF_IMAGES = 20; //Default Value: 20

//Whether the to-do list is enabled or not.
const TODO_ENABLED = true; //Default Value: true

//The webpage displayed when the todo list is open. You could change this to something like evernote, a calender website, or even an online game if you want to be sneaky. For privacy and performance reasons, this webpage is not loaded until the to-do button is clicked
const TODO_URL = "https://scanuproductions.com/webtools/To-Do/?embedded=true&transparent=true"; //Default Value: "https://scanuproductions.com/webtools/To-Do/?embedded=true&transparent=true"

//Whether the weather widget is enabled or not. Weather data is retrieved from wttr.in. If you are concerned about privacy you can disable the widged to prevent your new-tab page from connecting to wttr.in.
const WEATHER_ENABLED = true; //Default Value: true

//What location to provide to wttr.in when getting weather data. If left blank, wttr.in will use your current location. Example Values: "london", "iowa-city", "48.8755546,-87.6244212"
const WEATHER_LOCATION = ""; //Default Value: ""