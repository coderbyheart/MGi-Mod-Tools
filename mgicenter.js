// ==UserScript==
// @name           Zentrier MGi
// @namespace      http://www.mediengestalter.info/
// @description    Zentriert das MGi wieder
// @include        http://www.mediengestalter.info/*
// @include        http://mediengestalter.info/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body > table { margin: 0 auto; }');
