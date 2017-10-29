$(function(){
  var target = $(".before-after-image");
  var targetOffset = target.offset();
  var top = Math.floor(targetOffset.top);
  var right = Math.floor(target.width());
  var bottom = Math.floor(target.height());
  var left = Math.floor(targetOffset.left);
  var x = 0;
  var y = 0;
  var from = 'left'; // どっち方向から侵入してきたかを判別するフラグ

  target.on('mousemove', function(e){
    setXY(e);
    displayPosition(e);
    $(".before-after-image__item--selected").css("clip", "rect(0px," + right + "px," + bottom + "px," + x + "px)");
  });

  target.on('mouseleave', function(){
    setSelected(); //mouseleaveした時点で、大半を占めている方にselectedを付与する
  });

  setXY = function(e){
    x = e.pageX - left;
    y = e.pageY - top;
  }
  displayPosition = function(e){
    $(".js-position-x").html(x);
    $(".js-position-y").html(y);
  }

  setSelected = function(){
    //mouseleaveした時点で、大半を占めている方にselectedを付与する
  }
});
