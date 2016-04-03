function map(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function main() {
    var doc = document.documentElement;
    var height = window.innerHeight;
    window.onscroll = function() {
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        // sheet at page 3
        if (top >= height * 2 && top <= height * 3) {
            var pos = top - height * 2;
            var toBe = map(pos, 0, height, 100, 20);
            document.getElementById("sheet").style.marginTop = "" + toBe + "vh";
        } else if (top >= height * 0 && top <= height * 1) {
            console.log("l");
            var pos = top;
            var toBe = map(pos, 0, height, 0, 360);
            console.log(toBe);
            document.getElementById("planet").style.transform = "rotate(" + toBe + "deg)";
        }
    };

}
window.onload = main;
