// ==UserScript==
// @name     Custom YT
// @version  1
// @grant    none
// @match 	 https://youtube.com/*/*
// @match 	 https://youtube.com/*
// @match	   https://www.youtube.com/feed/subscriptions
// @match    https://www.youtube.com/watch*
// @match    https://www.youtube.com/playlist?*
// ==/UserScript==

/*
adds amt to the video speed
*/
function changeSpeed(amt){
  document.getElementsByTagName("video")[0].playbackRate = document.getElementsByTagName("video")[0].playbackRate + amt;
}

function updateSpeed(){
  var labels = document.getElementsByClassName("ytp-menuitem-label");
  for(var i=0;i<labels.length;i++){
    if(labels[i].innerHTML=="Playback speed"){
      var speed = document.getElementsByTagName("video")[0].playbackRate;
			document.getElementsByClassName("ytp-menuitem-content")[i].innerHTML = (speed==1 ? "Normal" : speed);
    }
  }
}

document.addEventListener("keypress", function(event) {
  //h hides watched videos on subbox
  if (event.keyCode == 104) {
        var bars = document.getElementsByClassName("style-scope ytd-thumbnail-overlay-resume-playback-renderer");
      	for(var i=1;i<bars.length;i++){
          var curBar = bars[i]
        	while(curBar.className!="style-scope ytd-grid-renderer"){
          	curBar = curBar.parentElement;
          }
          curBar.hidden=true;
        }
    }
  console.log(event.keyCode)
 
  //inc speed 0.5 with num +
  /*if (event.keyCode == 43) {
    changeSpeed(0.5);
    updateSpeed();
  }
  //dec speed 0.5 with num -
  if (event.keyCode == 45) {
    changeSpeed(-0.5);
    updateSpeed();
  }*/
  
  //playlist length calculator (legacy, only works on (removed) disable_polymer=true playlists)
  /*if(event.keyCode == 76 || event.keyCode == 108){
  	const table = document.getElementById("pl-video-table")
    const rows = Array.from(table.rows)
    const toSeconds = s => s ? s.split(':').map(v => parseInt(v)).reverse().reduce((acc,e,i) => acc + e * Math.pow(60,i)) : 0
    const getTimestamp = row => toSeconds(row.children[6].children[0].children[0].innerText)
    let seconds = rows.reduce((acc,e) => acc + getTimestamp(e),0)
    let mins = parseInt(seconds / 60)
    seconds %= 60
    let hours = parseInt(mins / 60)
    mins %= 60
    alert(hours+":"+mins+":"+seconds)
    console.log(hours+":"+mins+":"+seconds)
  }
 	//old playlist extender
  if(event.keyCode == 76 || event.keyCode == 107){
  	document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button")[0].click();
  }*/
})




