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

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function disableScroll() {
  console.log("disableScroll");
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

function onYouTubeIframeAPIReady() {
  //creates the player object
  ik_player1 = new YT.Player('ik_player_iframe1');
       
  console.log('Video API is loaded');
       
  //subscribe to events
  ik_player1.addEventListener("onReady",       "onYouTubePlayerReady");
  ik_player1.addEventListener("onStateChange", "onYouTubePlayerStateChange");
  
  ik_player2 = new YT.Player('ik_player_iframe2');
       
  //subscribe to events
  ik_player2.addEventListener("onReady",       "onYouTubePlayerReady");
  ik_player2.addEventListener("onStateChange", "onYouTubePlayerStateChange");
}

function onYouTubePlayerReady() {
  console.log('Video is ready to play');
}

function onYouTubePlayerStateChange(event) {
  enableScroll();
  window.canAnimateScroll = true;
}


function main() {
    if(mobileAndTabletCheck) {
        alert("Questo sito funziona solo da computer e tu stai navigando da un telefono o tablet: puoi continuare, ma troverai probabilmente dei bug nella navigazione")
    }
	//Holds a reference to the YouTube player
  var ik_player; 
	
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
            document.getElementById("planet").style.transform = "translateX(-50%) translateY(-50%)" + "rotate(" + toBe + "deg)";
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
            document.getElementById("six-wrapper").style.left= "" + toBe + "%";
        }
    };

}
window.onload = main;
