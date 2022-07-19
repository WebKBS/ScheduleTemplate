'use-strict';
let draggingEle;
let placeholder;
let isDraggingStarted = false;

let y = 0;
const mouseDownHandler = function (e) {
  draggingEle = e.currentTarget;
  draggingEle.style.cursor = 'grabbing';

  const rect = draggingEle.getBoundingClientRect();

  y = e.pageY - rect.top;

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

  // console.log(rect);
};

/* 마우스 무브 핸들러 */
const mouseMoveHandler = function (e) {
  const draggingRect = draggingEle.getBoundingClientRect();

  draggingEle.style.position = 'absolute';
  draggingEle.style.top = `${e.pageY - y}px`;

  // console.log(draggingRect);

  if (!isDraggingStarted) {
    isDraggingStarted = true;

    placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);

    /* 이동 위치 백그라운드 스타일 */
    placeholder.style.width = `${draggingRect.width}px`;
    placeholder.style.height = `${draggingRect.height}px`;
    placeholder.style.border = '1px dashed #999';
  }

  const prevEle = draggingEle.previousElementSibling;
  const nextEle = placeholder.nextElementSibling;
  if (prevEle && isAbove(draggingEle, prevEle)) {
    swap(placeholder, draggingEle);
    swap(placeholder, prevEle);
    return;
  }

  if (nextEle && isAbove(nextEle, draggingEle)) {
    swap(nextEle, placeholder);
    swap(nextEle, draggingEle);
  }
};

/* 마우스 업 핸들러 이벤트 삭제 */
const mouseUpHandler = function () {
  if (document.querySelector('.placeholder') != null) placeholder && placeholder.parentNode.removeChild(placeholder);
  isDraggingStarted = false;

  draggingEle.style.removeProperty('top');
  draggingEle.style.removeProperty('position');
  draggingEle.style.cursor = 'grab';

  y = null;
  draggingEle = null;

  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

//상위 부모
const list = document.getElementById('list');

/* 마우스 다운 이벤트 리스너 */
[].slice.call(list.querySelectorAll('.draggable')).forEach(function (item) {
  item.addEventListener('mousedown', mouseDownHandler);
});

const isAbove = function (nodeA, nodeB) {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  nodeB.parentNode.insertBefore(nodeA, nodeB);

  parentA.insertBefore(nodeB, siblingA);
};
