// ==UserScript==
// @name         YouTube captions editor improvements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fixes some annoying things with the new YouTube captions editor.
// @author       Nolan Whitecotton
// @match        https://studio.youtube.com/video/*/translations
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //ctrl+s to save captions draft
    let keysPressed = {};

    document.addEventListener('keyup', (event) => {
        delete this.keysPressed[event.key];
    });

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;

        if (keysPressed.Control && event.key == 's') {
            event.preventDefault();
            document.getElementById("save-draft-button").click();
        }
    });

    //display highlighted region and double drag size
    var css = `
ytve-captions-marker[marker-type=captions-right] #touch-area.ytve-captions-marker {
	left: -10px;
}

#touch-area.ytve-captions-marker {
	width: 10px;
}

.ytve-captions-marker:hover  {
  background-color: #f2ff0073;
}
`,
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


})();
