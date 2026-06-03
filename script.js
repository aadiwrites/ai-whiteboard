const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const boardArea = document.getElementById("boardArea");

canvas.width = boardArea.clientWidth;
canvas.height = boardArea.clientHeight;

ctx.lineCap = "round";

let drawing = false;
let tool = "pen";
let scale = 1;

document.getElementById("penBtn").onclick = () => {
  tool = "pen";
};

document.getElementById("eraserBtn").onclick = () => {
  tool = "eraser";
};

function startDraw(e){
  drawing = true;

  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x,y);
}

function draw(e){

  if(!drawing) return;

  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const color =
    document.getElementById("colorPicker").value;

  const size =
    document.getElementById("sizeSlider").value;

  ctx.strokeStyle =
    tool === "eraser" ? "#ffffff" : color;

  ctx.lineWidth = size;

  ctx.lineTo(x,y);

  ctx.stroke();
}

function stopDraw(){
  drawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
window.addEventListener("mouseup", stopDraw);

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];

  startDraw({
    clientX: touch.clientX,
    clientY: touch.clientY
  });

  e.preventDefault();
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];

  draw({
    clientX: touch.clientX,
    clientY: touch.clientY
  });

  e.preventDefault();
});

canvas.addEventListener("touchend", stopDraw);

document.getElementById("zoomIn").onclick = () => {
  scale += 0.1;
  canvas.style.transform = `scale(${scale})`;
};

document.getElementById("zoomOut").onclick = () => {
  scale -= 0.1;

  if(scale < 0.5) scale = 0.5;

  canvas.style.transform = `scale(${scale})`;
};

document.getElementById("stickyBtn").onclick = () => {

  const note = document.createElement("div");

  note.contentEditable = true;

  note.innerText = "New Note";

  note.style.position = "absolute";

  note.style.left = "100px";

  note.style.top = "100px";

  note.style.background = "#fde68a";

  note.style.padding = "10px";

  note.style.borderRadius = "10px";

  boardArea.appendChild(note);
};

document.getElementById("uploadBtn").onclick = () => {
  document.getElementById("imageUpload").click();
};

document.getElementById("imageUpload")
.addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(!file) return;

  const img = document.createElement("img");

  img.src = URL.createObjectURL(file);

  img.style.position = "absolute";

  img.style.left = "100px";

  img.style.top = "100px";

  img.style.width = "200px";

  boardArea.appendChild(img);
});
