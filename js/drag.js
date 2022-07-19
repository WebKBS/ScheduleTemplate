'use-strict';
const dragBox = document.querySelectorAll('[data-bar]');
const dragBtn = document.querySelectorAll('[data-drag]');
const userGauge = document.querySelectorAll('[data-gauge]');
const cardBox = document.querySelectorAll('[data-card]');
const rightBox = document.querySelector('.right_box');

// 엘리먼트 사이즈 드래그
for (let i = 0; i < dragBox.length; i++) {
  let userGaugeWidth = userGauge[i].offsetWidth;
  let cardBoxWidth = cardBox[i].offsetWidth;

  let x = 0;
  let leftWidth = 0;

  const mouseDownHandler = (e) => {
    // e.preventDefault();
    x = e.clientX;

    //현재 바 사이즈
    leftWidth = dragBox[i].getBoundingClientRect().width;
    // console.log(x);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
    const dx = e.clientX - x;

    const resizeWidth = leftWidth + dx;
    // console.log(dx);
    // console.log(resizeWidth);
    dragBox[i].style.width = `${resizeWidth}px`;

    // console.log(wrap.offsetWidth);

    if (dragBox[i].offsetWidth < userGaugeWidth) {
      dragBox[i].style.width = userGaugeWidth + 'px';
    }

    if (dragBox[i].offsetWidth > cardBoxWidth - 120) {
      dragBox[i].style.width = cardBoxWidth - 120 + 'px';
    }
  };

  const mouseUpHandler = (e) => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mousedown', mouseDownHandler);
  };

  dragBtn[i].addEventListener('mousedown', mouseDownHandler);
}

// 엘리먼트 이동 드래그
for (let i = 0; i < dragBox.length; i++) {
  let x = 0;
  let eleDefalutPos = 100;

  // console.log(rightBoxWidth);

  const eleMouseDownHandler = (e) => {
    x = e.clientX;

    document.addEventListener('mousemove', eleMouseMoveHandler);
    document.addEventListener('mouseup', eleMouseUpHandler);
  };

  const eleMouseMoveHandler = (e) => {
    const dx = e.clientX - x;

    dragBox[i].style.left = `${dragBox[i].offsetLeft + dx}px`;

    x = e.clientX;

    if (dragBox[i].offsetLeft > 500) {
      dragBox[i].style.left = cardBox + 'px';
    }
    if (dragBox[i].offsetLeft < 100) {
      dragBox[i].style.left = eleDefalutPos + 'px';
    }
  };

  const eleMouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', eleMouseMoveHandler);
    document.removeEventListener('mouseup', eleMouseUpHandler);
  };

  userGauge[i].addEventListener('mousedown', eleMouseDownHandler);
}
