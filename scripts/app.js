let circle = document.getElementsByClassName('circle');
let movingCircle = document.getElementsByClassName('moving_circle')[0];
circle = Array.from(circle);
let circleGap = document.getElementsByClassName('1')[0].offsetLeft;
let circleCount = 0;
let arrowCount = 0;
circle.forEach(element => {
  element.addEventListener('click', (e) => {
    cancelAnimationFrame(requestId);
    movingCircle.style.transform = `translateX(${e.target.offsetLeft}px)`;
    arrowCount = circleCount = Number(e.target.classList[1]);
    imageContainer.style.transform = `translateX(calc(-100% / 6 * ${arrowCount}))`;
    requestId = window.requestAnimationFrame(step);
    start = 0;
  })
});
let leftArrow = document.getElementsByClassName('left_arrow')[0];
let rightArrow = document.getElementsByClassName('right_arrow')[0];
let imageContainer = document.getElementsByClassName('container_img')[0];

let containerWidth = document.getElementsByClassName('container')[0].offsetWidth;
rightArrow.addEventListener('click', arrowClicked);
leftArrow.addEventListener('click', arrowClicked);

function arrowClicked(direction) {
  let calledClass;
  cancelAnimationFrame(requestId);
  if (this.classList)
    calledClass = this.classList[0];
  if (calledClass === 'right_arrow' || direction === 'right') {
    if (arrowCount === 5) {
      arrowCount = 0; circleCount = 0;
    }
    else {
      ++circleCount; ++arrowCount;
    }
  }
  else {
    if (arrowCount === 0) {
      arrowCount = 5; circleCount = 5;
    }
    else {
      --circleCount; --arrowCount;
    }
  }
  imageContainer.style.transform = `translateX(calc(-100% / 6 * ${arrowCount}))`;
  movingCircle.style.transform = `translateX(${circleCount * circleGap}px)`;
  requestId = window.requestAnimationFrame(step);
  start = 0;
}

let requestId;
let box = document.getElementsByClassName('box')[0];
let start;
function step(timestamp) {
  if (start === undefined || start === 0)
    start = timestamp;
  const elapsed = timestamp - start;
  if (elapsed >= 5000) {
    start = timestamp;
    arrowClicked('right');
  }
  requestId = window.requestAnimationFrame(step)
}
requestId = window.requestAnimationFrame(step);

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight')
    arrowClicked('right');
  else if (e.key === 'ArrowLeft')
    arrowClicked('left');
})