// ==UserScript==
// @name         YouTube captions editor improvements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fixes some annoying things with the new YouTube captions editor.
// @author       Nolan Whitecotton
// @match        https://studio.youtube.com/video/*/translations
// @match        https://studio.youtube.com/video/EPIW3DeZViw/translations
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

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

(function() {
    'use strict';

    //ctrl+s to save captions draft
    document.addEventListener('keydown', function(event) {
        if (event.code == "KeyS" && event.ctrlKey == true) {
            event.preventDefault();
            document.getElementById("save-draft-button").click();
        }
    });

    //display highlighted region and double drag size
    injectCSS(`
ytve-captions-marker[marker-type=captions-right] #touch-area.ytve-captions-marker {
	left: -10px;
}

#touch-area.ytve-captions-marker {
	width: 10px;
}

.ytve-captions-marker:hover  {
  background-color: #f2ff0073;
}
`);


})();
