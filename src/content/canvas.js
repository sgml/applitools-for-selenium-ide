const coords = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0
};

export function addCanvas() {
  const container = document.createElement("div");
  container.id = "applitools-container";
  const canvas = document.createElement("div");
  canvas.id = "applitools-canvas";
  const region = document.createElement("div");
  region.id = "applitools-region";
  setStyle(canvas, region);
  setEvents(container);
  const buttonContainer = createButtons(container);
  buttonContainer.style.zIndex = "10002";
  container.appendChild(buttonContainer);
  container.appendChild(canvas);
  container.appendChild(region);
  document.body.appendChild(container);
}

export function removeCanvas() {
  document.body.removeChild(document.getElementById("applitools-container"));
}

function setStyle(canvas, region) {
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.bottom = 0;
  canvas.style.right = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = "10000";
  canvas.style.backgroundColor = "rgba(0, 0, 0, 0.55)";
  canvas.style.cursor = "crosshair";

  region.style.position = "absolute";
  region.style.zIndex = "10001";
  region.style.backgroundColor = "rgba(94, 162, 220, 0.55)";
  region.style.border = "1px solid yellow";
  region.style.cursor = "crosshair";
}

function setEvents(container) {
  container.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    if (e.target.tagName === "BUTTON") return;
    updateRegion(e.pageX, e.pageY, e.pageX, e.pageY);
    container.addEventListener("mousemove", mousemove);
  });
  container.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    container.removeEventListener("mousemove", mousemove);
  });
}

function mousemove(e) {
  e.stopPropagation();
  if (e.target.tagName === "BUTTON") return;
  updateRegion(undefined, undefined, e.pageX, e.pageY);
}

function updateRegion(startX, startY, endX, endY) {
  const region = document.getElementById("applitools-region");
  if (startX) {
    coords.startX = startX;
  }
  if (startY) {
    coords.startY = startY;
  }
  if (endX) {
    coords.endX = endX;
  }
  if (endY) {
    coords.endY = endY;
  }
  region.style.left   = `${Math.min(coords.startX, coords.endX)}px`;
  region.style.top    = `${Math.min(coords.startY, coords.endY)}px`;
  region.style.width  = `${Math.abs(coords.endX - coords.startX)}px`;
  region.style.height = `${Math.abs(coords.endY - coords.startY)}px`;
}

function printCoords() { // eslint-disable-line no-unused-vars
  console.log(`startX: ${coords.startX}, startY: ${coords.startY}, endX: ${coords.endX}, endY: ${coords.endY}`);
}

function createButtons() {
  const container = document.createElement("div");
  const confirm = document.createElement("button");
  confirm.innerText = "Confirm";
  const cancel = document.createElement("button");
  cancel.innerText = "Cancel";
  cancel.addEventListener("click", removeCanvas);

  container.style.position = "fixed";
  container.style.top = 0;
  container.style.left = 0;
  container.style.right = 0;
  container.style.height = "30px";

  container.appendChild(cancel);
  container.appendChild(confirm);
  return container;
}
