// ==UserScript==
// @name     better dates
// @version  1.1
// @grant    none
// @match 	 https://www.speedrun.com/*
// ==/UserScript==

//replace the viewable date, with its title, the more accurate version
//this is useful for archiving purposes, as you can have a more exact
//timeframe as opposed to a date relative to current

//replaces all the dates on the page with the exact date and time
function updateDates(){
	let dates = document.getElementsByClassName("short circa");
	for(let i=0;i<dates.length;i++){
		dates[i].innerHTML = dates[i].title; 
	}
}

sleep(2000).then(() => {
	updateDates();
})
