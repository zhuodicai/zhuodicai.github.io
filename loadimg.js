function appear(elm, i, step, speed) {
  var t_o;
  //initial opacity
  i = i || 0;
  //opacity increment
  step = step || 5;
  //time waited between two opacity increments in msec
  speed = speed || 40;

  t_o = setInterval(function () {
    //get opacity in decimals
    var opacity = i / 100;
    //set the next opacity step
    i = i + step;
    if (opacity > 1 || opacity < 0) {
      clearInterval(t_o);
      //if 1-opaque or 0-transparent, stop
      return;
    }
    //modern browsers
    elm.style.opacity = opacity;
    //older IE
    elm.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
  }, speed);
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    images[i].onload = function () {
      appear(images[i], 0, 5, 40); 
    };
    images[i].src = images[i].dataset.src; // 确保重新触发onload事件
  }
});
