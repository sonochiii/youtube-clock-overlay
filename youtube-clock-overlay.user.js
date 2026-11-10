// ==UserScript==
// @name         YouTube Clock Overlay（左上に時計）
// @namespace    https://github.com/youtube-clock-overlay
// @version      1.0.0
// @description  YouTube再生中の画面・左上に現在時刻を表示する（PCブラウザ用 / Tampermonkey）
// @match        *://www.youtube.com/*
// @match        *://m.youtube.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var WEEK = ['日', '月', '火', '水', '木', '金', '土'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var box = document.createElement('div');
  box.id = 'yt-clock-overlay';
  box.style.cssText = [
    'position:fixed', 'top:10px', 'left:10px', 'z-index:2147483647',
    'pointer-events:none',
    'background:rgba(0,0,0,0.55)', 'border-radius:8px',
    'padding:4px 12px 6px', 'color:#fff',
    'font-family:-apple-system,"Hiragino Sans","Noto Sans JP",sans-serif',
    'font-variant-numeric:tabular-nums', 'line-height:1.15',
    'text-shadow:0 1px 3px rgba(0,0,0,.8)'
  ].join(';');

  var time = document.createElement('div');
  time.style.cssText = 'font-size:30px;font-weight:700;letter-spacing:1px;';
  var date = document.createElement('div');
  date.style.cssText = 'font-size:12px;opacity:.9;';
  box.appendChild(time);
  box.appendChild(date);
  document.body.appendChild(box);

  function tick() {
    var d = new Date();
    time.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    date.textContent = (d.getMonth() + 1) + '/' + d.getDate() + '（' + WEEK[d.getDay()] + '）';
  }
  tick();
  setInterval(tick, 250);

  // YouTubeはページ遷移でDOMを作り直すことがあるため、外れたら付け直す
  setInterval(function () {
    if (!document.getElementById('yt-clock-overlay')) document.body.appendChild(box);
  }, 2000);
})();
