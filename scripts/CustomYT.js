// ==UserScript==
// @name     Custom YT
// @version  1.2.2
// @grant    none
// @match    https://www.youtube.com/
// @match    https://youtube.com/*/*
// @match    https://youtube.com/*
// @match    https://www.youtube.com/feed/subscriptions
// @match    https://www.youtube.com/watch*
// ==/UserScript==

// ===== setings =====
//shrink thumbnails on homepage
let shrinkHomeThumbs = true;

//hide
let hideKey = "KeyH";
let hideCheckInterval = 1000; //how often it hides videos
let maxHideParentCheck = 10; //how far to look up for the video from the progress bar. This is a failsafe incase YT changes the classnames

//speed
let incSpeedKey = ""
let decSpeedKey = ""
let speedChangeAmmt = 0.5;

// ===== constants =====
//hide
let progressBarID = "#progress"; //The class of the progress bar, both in the subbox and recomendation sidebar
let fullVideoTagName = "ytd-grid-video-renderer"; //The tag of the entire video in the subbox
let fullRecomendedVideoClassName = "style-scope ytd-item-section-renderer" //The class of the entire video in the recomended sidebar

//speed
let VideoTagName = "video";
let playbackSpeedMenuTitle = "Playback speed";
let DefaultPlaybackSpeedName = "Normal";
let menuLabelClassName = "ytp-menuitem-label";
let menuItemClassName = "ytp-menuitem-content";

// ===== code =====
//adds amt to the video speed
function changeSpeed(amt){
  document.getElementsByTagName(VideoTagName)[0].playbackRate = document.getElementsByTagName(VideoTagName)[0].playbackRate + amt;
}

//update the playback speed notifier in the video play bar
function updateSpeed(){
  let labels = document.getElementsByClassName(menuLabelClassName);
  for(let i=0;i<labels.length;i++){
    if(labels[i].innerHTML==playbackSpeedMenuTitle){
      let speed = document.getElementsByTagName(VideoTagName)[0].playbackRate;
      document.getElementsByClassName(menuItemClassName)[i].innerHTML = (speed==1 ? DefaultPlaybackSpeedName : speed);
    }
  }
}

//checks if input is in list[]
function isOneOf(input, ...list){
  for(let i=0;i<list.length;i++){
    if(input==list[i]){
      return true;
    }
  }
  return false;
}

//update hidden/unhidden video state
let watchedAreHidden = false; //whether the videos are hidden
let hiddenVideos = []; //list of currently hidden videos
let lastCheckURL = ""; //the url of the page last time update hidden was called
setInterval(updateHidden, hideCheckInterval);
function updateHidden(){
  //if the url changes, unhide videos
  if(lastCheckURL != document.URL){
    watchedAreHidden = false;
  }
  lastCheckURL = document.URL;

  if(watchedAreHidden){
    //hide any unhidden videos
    let videos = document.getElementsByTagName(fullVideoTagName);
    for(let i=0; i<videos.length; i++){
      if(videos[i].querySelector(progressBarID) != null){
      	videos[i].hidden = true;
        hiddenVideos.push(videos[i]);
      }
    }
  }else{
    //unhide hidden videos
    for(let i=hiddenVideos.length-1;i>=0;i--){
      hiddenVideos[i].hidden=false;
    }
  }
}

//injects css as a string to the page
// css injection javascript source: https://stackoverflow.com/a/524721/9826113
function injectCSS(cssToInject){
  let css = cssToInject,
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

if(shrinkHomeThumbs){
  injectCSS(`
ytd-thumbnail.ytd-rich-grid-media{
width: 15%; !important
}
`);
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

//redirect if url is the shorts viewer
