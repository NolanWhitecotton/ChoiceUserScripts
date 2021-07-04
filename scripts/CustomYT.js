// ==UserScript==
// @name     Custom YT
// @version  1.1.0
// @grant    none
// @match    https://youtube.com/*/*
// @match    https://youtube.com/*
// @match    https://www.youtube.com/feed/subscriptions
// @match    https://www.youtube.com/watch*
// ==/UserScript==

// ===== setings =====
//hide
var hideKey = "KeyH";
var hideCheckInterval = 1000; //how often it hides videos
var maxHideParentCheck = 5; //how far to look up for the video from the progress bar. This is a failsafe incase YT changes the classnames

//speed
var incSpeedKey = ""
var decSpeedKey = ""
var speedChangeAmmt = 0.5;

// ===== constants =====
//hide
var progressBarClassName = "style-scope ytd-thumbnail-overlay-resume-playback-renderer";
var fullVideoClassName = "style-scope ytd-grid-renderer";

//speed
var VideoTagName = "video";
var playbackSpeedMenuTitle = "Playback speed";
var DefaultPlaybackSpeedName = "Normal";
var menuLabelClassName = "ytp-menuitem-label";
var menuItemClassName = "ytp-menuitem-content";

// ===== code =====
//adds amt to the video speed
function changeSpeed(amt){
	document.getElementsByTagName(VideoTagName)[0].playbackRate = document.getElementsByTagName(VideoTagName)[0].playbackRate + amt;
}

//update the playback speed notifier in the video play bar
function updateSpeed(){
	var labels = document.getElementsByClassName(menuLabelClassName);
	for(var i=0;i<labels.length;i++){
		if(labels[i].innerHTML==playbackSpeedMenuTitle){
			var speed = document.getElementsByTagName(VideoTagName)[0].playbackRate;
			document.getElementsByClassName(menuItemClassName)[i].innerHTML = (speed==1 ? DefaultPlaybackSpeedName : speed);
		}
	}
}

//update hidden/unhidden video state
var watchedAreHidden = false; //whether the videos are hidden
var hiddenVideos = []; //list of currently hidden videos
setInterval(updateHidden, hideCheckInterval);
function updateHidden(){
	if(watchedAreHidden){
		//hide videos
		var bars = document.getElementsByClassName(progressBarClassName);
		for(var i=0;i<bars.length;i++){//for every bar
			var curBar = bars[i];
			var curDepth = 0;
			//get the parent until it is a full video
			while(curDepth <= maxHideParentCheck){
				curDepth++;
				curBar = curBar.parentElement;
				if(curBar.className==fullVideoClassName){
					//hide and add to hiddenVideoss
					curBar.hidden=true;
					hiddenVideos.push(curBar);
					break;
				}
			}
		}
	}else{
		//unhide videos
		for(var i=hiddenVideos.length-1;i>=0;i--){
			hiddenVideos[i].hidden=false;
		}
	}
}

//handle keypresses
document.addEventListener("keypress", function(event) {
	//toggle hide
	if (event.code == hideKey) {
		watchedAreHidden = !watchedAreHidden;
		updateHidden();
	}
	console.log(event.code)

	//inc speed
	if (event.code == incSpeedKey) {
		changeSpeed(speedChangeAmmt);
		updateSpeed();
	}
	//dec speed
	if (event.code == decSpeedKey) {
		changeSpeed(speedChangeAmmt*-1);
		updateSpeed();
	}
})
