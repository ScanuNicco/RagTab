# RagTab
An open-source alternative to the Momentum new tab page.
![Screenshot of RagTab](Screenshot.png)

# Why does this exist?
There are several decent new tab extensions already available, but many lack customization and prompt you for paid subscriptions from time to time. RagTab is an open-source alternative to those extensions.

# How do I install it?
## Install from source code
1) Clone this repository
2) In firefox, go to the add-ons page. Then click the gear and go to "Debug Add-Ons"
3) Click "Load temporary Add-On" and select manifest.json

## Permenant installation
I am currently preparing to upload RagTab to the Firefox add-ons store. I currently have no plans to add RagTab to the Chrome Web Store because it costs money to do so.

# What's up with the To-Do list.
The to-do list should be considered in alpha, which is why it is disabled by default. While the to-do list itself is relatively stable, my site-wide account system is in need of stability upgrades and the login page needs to be optomized for small windows.

# Adding background images
After cloning this repo, add your images to the Backgrounds folder. Then modify backgrounds.json to include the URLs of the images you want to add, making sure to add a location and crediting yourself. After that submit a PR and i'll decide whether your images are a good fit. Images should be of nature and not have people in them to the extent possible.

# Adding search engines.
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
(Note that the last item does not have a comma at the end. You may want to use an online JSON validator to double check.)
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
5) Finally, you'll need to set SEARCH_ENGINE in config.js. Computers start counting at 0, not 1, so in my example I set SEARCH_ENGINE to 3 for Craigslist.
