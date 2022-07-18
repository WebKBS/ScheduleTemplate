'use-strict';
const dragBox = document.querySelectorAll('[data-bar]');
const dragBtn = document.querySelectorAll('[data-drag]');
const userGauge = document.querySelectorAll('[data-gauge]');
const cardBox = document.querySelectorAll('[data-card]');

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
    // console.log(leftWidth);

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

    if (dragBox[i].offsetWidth > cardBoxWidth - 100) {
      dragBox[i].style.width = cardBoxWidth - 100 + 'px';
    }
  };

  const mouseUpHandler = (e) => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mousedown', mouseDownHandler);
  };

  dragBtn[i].addEventListener('mousedown', mouseDownHandler);
}
