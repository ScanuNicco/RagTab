# Development Guide
## Adding background images
After cloning this repo, add your images to the Backgrounds folder. Then modify backgrounds.json to include the paths of the images you want to add, making sure to add a location and crediting yourself. After that submit a PR and I'll decide whether your images are a good fit. Images should be of nature and not have people in them to the extent possible. If submitting images taken by others, ensure to obtain permission first.

## Adding search engines.
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

## Testing
If `web-ext` is installed on your system, simply navigate to the `src` folder and, in the terminal, run `web-ext run`. This will automatically load RagTab in a dedicated instance of firefox and automatically reload when changes to the files are detected.

## Packaging
1) Ensure `web-ext` is installed on your system
2) Navigate to the directory where RagTab is located
3) Convert any new images to webp to reduce size. If on bash is your terminal and `cwebp` is installed, you can use `makeWebP.sh` to convert a whole folder.
3) Run `web-ext build`
4) Correct errors and warning if possible, then build again
