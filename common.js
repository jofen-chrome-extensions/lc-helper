
function googleSearch(text, tab) {
	let url =
    'https://google.com/search?q=leetcode solution ' + text;
  chrome.tabs.create({url: url, index: tab.index + 1});
}
