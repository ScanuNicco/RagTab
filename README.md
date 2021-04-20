# RagTab
An open-source alternative to the Momentum new tab page.
![Screenshot of RagTab](Screenshot.png)

# Why does this exist?
- I was bored
- Edge randomly removed Momentum from my computer.
- I was tired of Momentum nagging me to upgrade.
- I wanted a new-tab page that could use my To-Do list

# Why isn't the to-do list fully open-source?
If I didn't keep my PHP private, my friends would immediately find a way to break it. The to do list widget can be pointed at a different webpage or disabled completely in config.js if you don't like it.

# Can I use my own background images?
I will probably make that configurable in the future.

# I want Google instead of DuckDuckGo!
The search engine can be configured by setting SEARCH_ENGINE in config.js. 0 is DuckDuckGo, 1 is Google, 2 is Wikipedia

# How can I set a different search engine besides DuckDuckGo, Google, and Wikipedia
As long as you are familiar with JSON, you should be able to add any search engine. For these instructions, I will use craigslist.org as an example
1) Search something on the website you want to add.
2) Get everything in the URL that comes before the search term. In this case my URL was `https://sfbay.craigslist.org/d/for-sale/search/sss?query=vr%20headset&sort=rel`, so I got `https://sfbay.craigslist.org/d/for-sale/search/sss?query=`.
3) Add the following to engines.json, make sure to put it before the closing `]`:
```json 
{
		"name": "[Search Engine Name]",
		"url": "[URL From Step 2]"
}
```
4) Make sure your engines.json looks something like this:
```json 
[
	{
		"name": "DuckDuckGo",
		"url": "https://duckduckgo.com?q="
	},
	{
		"name": "Google",
		"url": "https://www.google.com/search?q="
	},
	{
		"name": "Wikipedia",
		"url": "https://en.wikipedia.org/w/index.php?search="
	},
	{
		"name": "Craigslist",
		"url": "https://sfbay.craigslist.org/d/for-sale/search/sss?query="
	}
 ]
```
Note that the last item does not have a comma at the end. You may want to use an online JSON validator.
5) Finally, you need to set SEARCH_ENGINE in config.js. Computers start counting at 0, not 1, so in my example I set SEARCH_ENGINE to 3 for Craigslist.