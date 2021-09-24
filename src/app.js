
async function init() {
  miro.addListener('SELECTION_UPDATED', setCount);

  setCount();
  document.querySelector('#btn-sum').addEventListener('click', function(){
    sumSelectedWidgets().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
  document.querySelector('#btn-sub').addEventListener('click', function(){
    subtractSelectedWidgets().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
  document.querySelector('#btn-multi').addEventListener('click', function(){
    multiplySelectedWidgets().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
  document.querySelector('#btn-div').addEventListener('click', function(){
    divideSelectedWidgets().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
  document.querySelector('#btn-rand').addEventListener('click', function(){
    randomFromSelectedWidgets().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
  document.querySelector('#btn-count').addEventListener('click', function(){
    printCount().then(() => console.log('click')).catch(e=> console.error('something went wrong'));
  });
}
miro.onReady(() => {
init();
});

async function setCount()
{
  const widgets = await miro.board.selection.get();
  document.querySelector('#count-selected').innerHTML = 'Selected Objects: ' + widgets.length;
}

async function createSticker(text, x, y, zoom = false)
{
  const [sticker2] = await miro.board.widgets.create({
    type: 'sticker',
    text: text,
    x: x,
    y: y,
    style: {
      stickerBackgroundColor: "#a6ccf5"
    },});

    if (zoom) {
      await miro.board.viewport.zoomToObject(sticker2);
    }
}

async function getLastWidgetPos()
{
  const widgets = await miro.board.selection.get();
  let lastX = -Infinity;
  let lastY = -Infinity;
  for (let i = 0; i < widgets.length; i++) {
    if (widgets[i].bounds.x > lastX) {
      lastX = widgets[i].bounds.x + widgets[i].bounds.width;
    }
    if (widgets[i].bounds.y > lastY) {
      lastY = widgets[i].bounds.y;
    }
  }
  let newPos = {x: lastX, y:lastY};
  return newPos;
}

async function printCount()
{
  const widgets = await miro.board.selection.get();
  document.querySelector('#count-selected').innerHTML = 'Selected Objects: ' + widgets.length;
  let newPos = await getLastWidgetPos();
  createSticker(widgets.length, newPos.x, newPos.y);
}

async function sumSelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  let total = 0;
  for (let i = 0; i < widgets.length; i++){
    const num = parseInt(widgets[i].plainText);
    if (typeof num == 'number') {
      total += num;
    }
  }
  let newPos = await getLastWidgetPos();
  createSticker(total.toString(), newPos.x, newPos.y);
}
async function subtractSelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  let total = 0;
  for (let i = 0; i < widgets.length; i++){
    const num = parseInt(widgets[i].plainText);
    
    if (typeof num == 'number') {
      if(i==0) {
        total = num;
      } else {
        total -= num;
      }
    }
  }
  let newPos = await getLastWidgetPos();
  createSticker(total.toString(), newPos.x, newPos.y);
}

async function multiplySelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  let total = 1;
  for (let i = 0; i < widgets.length; i++){
    const num = parseInt(widgets[i].plainText);
    if (typeof num == 'number') {
      total *= num;
    }
  }
  let newPos = await getLastWidgetPos();
  createSticker(total.toString(), newPos.x, newPos.y);
}
async function divideSelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  let total = 0;
  for (let i = 0; i < widgets.length; i++){
    const num = parseInt(widgets[i].plainText);
    if (typeof num == 'number') {
      if (i == 0) {
        total = num;
      } else {
        total /= num;
      }
    }
  }
  let newPos = await getLastWidgetPos();
  createSticker(total.toString(), newPos.x, newPos.y);
}


async function randomFromSelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  
  if (widgets.length == 2) {
    const text1 = parseInt(widgets[0].plainText);
    const text2 = parseInt(widgets[1].plainText);

    let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
    let newY = widgets[widgets.length-1].bounds.y;

    const randomNumber = randomIntFromInterval(text1,text2);
    let newPos = await getLastWidgetPos();
    createSticker(randomNumber.toString(), newPos.x, newPos.y);
  }
  else {
    let newPos = await getLastWidgetPos();
    createSticker(randomNumber.toString(), newPos.x, newPos.y);
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
