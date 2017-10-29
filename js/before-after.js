/*
 * 現状、X方向のスライドにしか対応していないが、
 * 侵入方向の判定を追加することで、Y方向のスライドにも対応可能
 */
function setZindex() {
  count = $(".before-after-image__item").length;
  $(".before-after-image__item").each(function(i) {
    $(this).css("z-index", count-i);
  });
}

$(function(){
  var target = $(".before-after-image");
  var targetOffset = target.offset();
  var x = 0;
  var y = 0;

  var IMAGEDIR = {
    TOP:    Math.floor(targetOffset.top),
    RIGHT:  Math.floor(target.width()),
    BOTTOM: Math.floor(target.height()),
    LEFT:   Math.floor(targetOffset.left)
  };
  var FROMDIR = {
    UP:    0,
    DOWN:  1,
    RIGHT: 2,
    LEFT:  3
  };

  setZindex();

  target.on('mousemove', function(e){
    setXY(e);
    displayPosition(e);
    $(".before-after-image__item--selected").css("clip", "rect(0px," + IMAGEDIR.RIGHT + "px," + IMAGEDIR.BOTTOM + "px," + x + "px)");
  });

  target.on('mouseleave', function(){
    //clipを段階的にすることで、ぬるっとできる
    if(x > IMAGEDIR.RIGHT/2) {
      var selected = $(".before-after-image__item--selected");
      selected.css("display", "none");
      selected.removeClass("before-after-image__item--selected");
      var next = selected.next(".before-after-image__item");
      next.addClass("before-after-image__item--selected");
    }
    else {
      // 左側の場合、現在画像でstay
    }
  });

  setXY = function(e){
    x = e.pageX - IMAGEDIR.LEFT;
    y = e.pageY - IMAGEDIR.TOP;
  }
  displayPosition = function(e){
    $(".js-position-x").html(x);
    $(".js-position-y").html(y);
  }
});
