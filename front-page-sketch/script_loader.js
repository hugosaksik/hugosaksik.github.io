[
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js",
  "https://cdn.rawgit.com/bitcraftlab/p5.gui/master/libraries/p5.gui.js",
  "https://cdn.rawgit.com/bit101/quicksettings/master/quicksettings.js",
  "./front-page-sketch/arrowGrid.js",
].forEach(src => {
  var script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.async = false;
  document.head.appendChild(script);
});