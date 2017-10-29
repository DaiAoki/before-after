/* Develop Memo
 * 現状、X方向のスライドにしか対応していないが、
 * 侵入方向の判定を追加することで、Y方向のスライドにも対応可能
 */

/*****************/
/*** Variables ***/
/*****************/
var target;
var targetOffset;
var IMAGEDIR = {
  TOP:    void(0),
  RIGHT:  void(0),
  BOTTOM: void(0),
  LEFT:   void(0)
};

var FROMDIR = {
  UP:    0,
  DOWN:  1,
  RIGHT: 2,
  LEFT:  3
};
var from = FROMDIR.LEFT;

var x = 0;
var y = 0;


/*****************/
/*** Functions ***/
/*****************/
function initialize() {
  target = $(".before-after-image");
  targetOffset = target.offset();
  IMAGEDIR = {
    TOP:    Math.floor(targetOffset.top),
    RIGHT:  Math.floor(target.width()),
    BOTTOM: Math.floor(target.height()),
    LEFT:   Math.floor(targetOffset.left)
  };
}
function setZindex() {
  count = $(".before-after-image__item").length;
  $(".before-after-image__item").each(function(i) {
    $(this).css("z-index", count-i);
  });
}
function resetImage() {
  $(".before-after-image__item").each(function(i) {
    $(this).removeClass("before-after-image__item--selected");
    $(this).css("clip", "rect(0px," + IMAGEDIR.RIGHT + "px," + IMAGEDIR.BOTTOM + "px, 0px)");
    $(this).show();
    $(this).css("z-index", count-i);
  });
  $(".before-after-image__item").first().addClass("before-after-image__item--selected");
}
function setXY(e) {
  x = e.pageX - IMAGEDIR.LEFT;
  y = e.pageY - IMAGEDIR.TOP;
}
function displayPosition(e) {
  $(".js-position-x").html(x);
  $(".js-position-y").html(y);
}


/*****************/
/*** Implement ***/
/*****************/
$(function(){
  initialize();
  setZindex();

  target.on({
    mouseenter: function(e){
      setXY(e);  //UP/DOWNも考慮する場合、判定範囲を対角線区切り(四角に対角線で4ブロック)に変更する必要あり
      if( x > IMAGEDIR.RIGHT/2 ) {
        from = FROMDIR.RIGHT;
      }
      else{
        from = FROMDIR.LEFT;
      }
    },
    mousemove: function(e){
      setXY(e);
      displayPosition(e);
      switch( from ){
        case FROMDIR.LEFT:
          $(".before-after-image__item--selected").css("clip", "rect(0px," + IMAGEDIR.RIGHT + "px," + IMAGEDIR.BOTTOM + "px," + x + "px)");
          break;
        case FROMDIR.RIGHT:
          break;
        case FROMDIR.TOP:
          break;
        case FROMDIR.BOTTOM:
          break;
        default:
          break;
      }
    },
    mouseleave: function(e){
      //leaveした時点が左端だったらrectをresetする
      //clipを段階的にすることで、ぬるっとできる
      setXY(e);
      displayPosition(e);
      var selected = $(".before-after-image__item--selected");
      var next = selected.next(".before-after-image__item");
      switch( from ){
        case FROMDIR.LEFT:
          if( x > IMAGEDIR.RIGHT/2 ){
            selected.hide("slow");
            selected.removeClass("before-after-image__item--selected");
            next.addClass("before-after-image__item--selected");
          }
          else {
            var rect = selected.css("clip").match(/\d+/g);
            var rectLeft = rect.pop();
            if( rectLeft <= 0 ) break;
            var i = rectLeft;
            var slowClip = function(){
              if( i === 0) return;
              i--;
              selected.css("clip", "rect(0px," + IMAGEDIR.RIGHT + "px," + IMAGEDIR.BOTTOM + "px," +  i + "px)");
              setTimeout(function(){
                slowClip();
              }, 2);
            };
            slowClip();
          }
          break;
        case FROMDIR.RIGHT:
          break;
        case FROMDIR.TOP:
          break;
        case FROMDIR.BOTTOM:
          break;
        default:
          break;
      }
    }
  });

  $(".js-reset-btn").on('click', function(){
    resetImage();
  });
});
