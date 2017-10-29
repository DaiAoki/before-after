$(function(){
  var target = $(".before-after-image");
  var targetOffset = target.offset();
  var top = Math.floor(targetOffset.top);
  var right = Math.floor(target.width());
  var bottom = Math.floor(target.height());
  var left = Math.floor(targetOffset.left);
  var x = 0;
  var y = 0;
  var trace = 0;
  var from = 'left'; // どっち方向から侵入してきたかを判別するフラグ
  var positionX = $(".js-position-x");
  var positionY = $(".js-position-y");

  target.on('mousemove', function(e){
    setXY(e);
    displayPosition(e);
    $(".before-after-image__item--selected").css("clip", "rect(0px," + right + "px," + bottom + "px," + x + "px)");
  });

  target.on('mouseleave', function(){
    trace = 0;
    setSelected(); //mouseleaveした時点で、大半を占めている方にselectedを付与する
  });

  setXY = function(e){
    x = e.pageX - left;
    y = e.pageY - top;
  }
  displayPosition = function(e){
    positionX.html(x);
    positionY.html(y);
  }

  setSelected = function(){
    //mouseleaveした時点で、大半を占めている方にselectedを付与する
  }


  $(".before-after-image__item--selected").on('mouseenter', function(e){
    trace = 1;
    //transferImage(e);
  });
  transferImage = function(e){
    //eが固定値になっているから、この方法では絶えず変えられない
    if(trace) {
      //座標に応じて、clipプロパティの値を変える
      positionX.html(e.pageX);
    }
    setTimeout(transferImage, 100);
  }
});
