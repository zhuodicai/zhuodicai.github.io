// 方案1: 忘了怎么回事了，反正不是很好用
// function appear(elm, i, step, speed) {
//   var t_o;
//   //initial opacity
//   i = i || 0;
//   //opacity increment
//   step = step || 5;
//   //time waited between two opacity increments in msec
//   speed = speed || 40;

//   t_o = setInterval(function () {
//     //get opacity in decimals
//     var opacity = i / 100;
//     //set the next opacity step
//     i = i + step;
//     if (opacity > 1 || opacity < 0) {
//       clearInterval(t_o);
//       //if 1-opaque or 0-transparent, stop
//       return;
//     }
//     //modern browsers
//     elm.style.opacity = opacity;
//     //older IE
//     elm.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
//   }, speed);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const images = document.getElementsByTagName('img');
//   for (let i = 0; i < images.length; i++) {
//     images[i].onload = function () {
//       appear(images[i], 0, 5, 40); 
//     };
//     images[i].src = images[i].dataset.src; // 确保重新触发onload事件
//   }
// });

//  方案2： 这个会影响lazyload...
// document.addEventListener('DOMContentLoaded', function() {
//   var images = document.getElementsByTagName('img');
//   var imageCount = images.length;
//   var loadedCount = 0;

//   function handleImageLoad() {
//     loadedCount++;
//     if (loadedCount === imageCount) {
//       for (var i = 0; i < images.length; i++) {
//         images[i].style.opacity = 1;
//       }
//     }
//   }

//   for (var i = 0; i < images.length; i++) {
//     var img = images[i];
//     img.addEventListener('load', handleImageLoad);
//     img.src = img.dataset.src;
//   }
// });

// 方案3: 绝了
document.addEventListener('DOMContentLoaded', function () {
  var images = document.querySelectorAll('img:not([data-no-lazy])'); // 排除有 data-no-lazy 的图片

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
        img.addEventListener('load', function () {
          img.style.opacity = 1;
        });
      }
    });
  });

  for (var i = 0; i < images.length; i++) {
    observer.observe(images[i]);
  }
});

