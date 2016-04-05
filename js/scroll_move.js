function map(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}



function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

function my_smoothScroll() {
    var doc = document.documentElement;
    var height = window.innerHeight;
   var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    var current = Math.ceil(top / height);
    if (top < window.scrolled)
        current--;
    var direction = (top > window.scrolled); // down = true, up = false
    console.log(current);
    console.log("c*h ", (current) * height, "top ", top, "-", current * height - top);
    if ((current === 3 && direction) || (current === 4 && direction && (current * height - top) > (height * 5/6))){ 
        return;
    }
    var l = ["one", "two", "four", "four", "three", "eight", "six", "seven"];
    var toGo = l[current];
    console.log(toGo);
    disableScroll();
    window.canAnimateScroll = false;
    smoothScroll.animateScroll('#' + toGo, null, {"speed": 500, callback: function() {
        window.canAnimateScroll = true;
        window.scrolled = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        enableScroll();
    }});
}

function main() {
    console.log(window.innerHeight, window.innerHeight / 3);
    var doc = document.documentElement;
    var height = window.innerHeight;
    window. canAnimateScroll = true;
    window.onscroll = function(e) {
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        if (window.canAnimateScroll) {
            my_smoothScroll();
        }
        if (top >= height * 0 && top <= height * 1) { // planet
            var pos = top;
            var toBe = map(pos, 0, height, 0, 360);
            document.getElementById("planet").style.transform = "rotate(" + toBe + "deg)";
        } else if (top >= height * 1 && top <= height * 2) { //sheet
            var pos = top - height * 1;
            var toBe = map(pos, 0, height, 100, 20);
            document.getElementById("sheet").style.marginTop = "" + toBe + "vh";
        } else if (top >= height * 3 && top <= height * 4) { // bill
            var pos = top - height * 3;
            var toBe = map(pos, 0, height, 0, 50);
            document.getElementById("bill").style.marginLeft= "" + toBe + "%";
            var toBe = map(pos, 0, height, 0, 370);
            document.getElementById("bill").style.transform = 
                "translate(-50%, -50%) rotate(" + toBe + "deg)";
        } else if (top >= height * 5 && top <= height * 7) {  // credit card
            var pos = top - height * 5;
            var toBe = map(pos, 0, height, 100, 0);
            document.getElementById("six").style.left= "" + toBe + "%";
        }
    };

}
window.onload = main;
