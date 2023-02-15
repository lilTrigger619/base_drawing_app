const $canvas = document.querySelector("canvas");
const $brush_size_entry = document.querySelector("#brush_size_entry");
const $plus_btn = document.querySelector("#plus-size");
const $minus_btn = document.querySelector("#minus-size");
$brush_size_entry.textContent = 1;
// the size or thickness of the brush
let brush_size = 10; //default size.
let brush_color = "#00000"; //default color.
let mouseHold = false; // default for drag.

const ctx = $canvas.getContext("2d");
console.log("ctx", ctx);

// drawing object.
const drawingInstance = {
  // draw a line.
  drawLine(x, y) {
    //ctx.lineWidth = brush_size;
    ctx.lineTo(x, y);
    ctx.stroke();
  },

  // clear the path.
  haltDraw(){
    ctx.beginPath();
    //ctx.closePath();
  },

  //move the brush to a location.
  moveTo(locX, locY) {
    ctx.moveTo(locX, locY);
  },

  //size of the line.
  incBrushSize() {
    ctx.lineWidth = ctx.lineWidth+1;
  },
  // decrease the size of the line.
  decBrushSize() {
    ctx.lineWidth <= 0 ? null : (ctx.lineWidth = ctx.lineWidth - 1);
  },

  getBrushSize(){
    return ctx.lineWidth;
  }

};

//increase the size of the brush.
$plus_btn.addEventListener("click", increaseBrushSize);

//decrease the size of the brush.
$minus_btn.addEventListener("click", decreaseBrushSize);

$canvas.addEventListener("mousedown", () => (mouseHold = true));

$canvas.addEventListener("mouseup", motionStop);

$canvas.addEventListener("mousemove", motionDraw);

//(eventHandler) function to draw on mouse drag.
function motionDraw(e) {
  if (mouseHold === true) {
    drawingInstance.drawLine(e.offsetX, e.offsetY);
  } else {
    // else when the mouse is not clicked or dragged on but is being moved.
    drawingInstance.moveTo(e.offsetX, e.offsetY);
  }
}; // end of motionDraw function.


// (eventHandler) function when the mouse is released after draw.
function motionStop(e){
  mouseHold = false;
  drawingInstance.haltDraw()
}; // end of motionStop function

//(eventHandler) increase brush size
function increaseBrushSize(){
  drawingInstance.incBrushSize();
  $brush_size_entry.textContent = drawingInstance.getBrushSize();
};// end of increaseBrushSize function

//(eventHandler) decrease brush size 
function decreaseBrushSize(){
  drawingInstance.decBrushSize();
  $brush_size_entry.textContent = drawingInstance.getBrushSize();
}; // end of decreaseBrushSize function.

//drawCircle(30, 30);

window.document.addEventListener("resize", e=>console.log("resized",e))
