/*
    This file is part of RagTab.

    RagTab is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    RagTab is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with RagTab. If not, see <https://www.gnu.org/licenses/>.
*/

//Whether the to-do list is enabled or not.
const TODO_ENABLED = false; //Default Value: true

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
const COUNTDOWN_ENABLED = false; //Default Value: false

//The time that the countdown widget is counting down to. Can be any format that the JavaScript Date() object takes.
const COUNTDOWN_TIME = 1699027200000; //Default Value: 1699027200000 (The release date of the dune part 2)

//The title that is displayed on the widget.
const COUNTDOWN_TITLE = "Movie Releases In:"; //Default Value: "Movie Releases In:"

//Whether the California Wildfires widget will display. The widget still won't display if you aren't in California or if Califrornia is not on fire.
const CALIFORNIA_WILDFIRES = false; //Default Value: true

//Display the clock in 24-hour time
const MILITARY_TIME = false; //Default Value: false

//Display seconds on the clock
const CLOCK_SECONDS = false; //Default Value: false
