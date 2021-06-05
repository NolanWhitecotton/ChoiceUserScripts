// ==UserScript==
// @name     Reddit fix lag
// @version  1
// @grant    none
// @match    https://www.reddit.com/
// ==/UserScript==

//NOTE: This only fixes the clientside lag, most of the hangtime on reddit comes from waiting for a response therefore
//      I don't think that it is worth maintaining.

var containerClassName = "rpBJOHq2PR60pnwJlUyP0"; //the name of the container that holds all the posts
var hideKey = "KeyP";//the keycode of the key to depete posts from the dom
var PostKeepBuffer = 15;//the number of posts to keep at the end

document.addEventListener("keypress", function(event) {
  //h removes all posts loaded on the screen, hopefully fixes massive lag from bubbling every click
  console.log(event.code);
  if (event.code == hideKey) {
    //get posts
    var posts = document.getElementsByClassName(containerClassName)[0].children;
    //get the number of posts
    var preDel = posts.length;

    //calc startpoint
    var startPoint = posts.length-1-PostKeepBuffer;
    if(startPoint<0){
    	startPoint=0;
    }
    
    //delete all posts, in reverse since they get deleted from posts
    for(var i=startPoint; i>=0; i--){
      posts[i].remove();
    }

    var posts = document.getElementsByClassName(containerClassName)[0].children;
    var postDel = posts.length;
    console.log("deleted " + (preDel-postDel) + " posts.");
  }
})
