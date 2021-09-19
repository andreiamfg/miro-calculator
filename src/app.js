
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
async function printCount()
{
  const widgets = await miro.board.selection.get();
  document.querySelector('#count-selected').innerHTML = 'Selected Objects: ' + widgets.length;
  let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
  let newY = widgets[widgets.length-1].bounds.y;
  const [sticker2] = await miro.board.widgets.create({
    type: 'sticker',
    text: widgets.length,
    x: newX,
    y: newY,
});

await miro.board.viewport.zoomToObject(sticker2);
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
  let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
  let newY = widgets[widgets.length-1].bounds.y;

  const [sticker2] = await miro.board.widgets.create({
      type: 'sticker',
      text: total.toString(),
      x: newX,
      y: newY,
  });

  await miro.board.viewport.zoomToObject(sticker2);
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
  let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
  let newY = widgets[widgets.length-1].bounds.y;

  const [sticker2] = await miro.board.widgets.create({
      type: 'sticker',
      text: total.toString(),
      x: newX,
      y: newY,
  });

  await miro.board.viewport.zoomToObject(sticker2);
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
  let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
  let newY = widgets[widgets.length-1].bounds.y;
  const [sticker2] = await miro.board.widgets.create({
      type: 'sticker',
      text: total.toString(),
      x: newX,
      y: newY,
  });

  await miro.board.viewport.zoomToObject(sticker2);
}
async function divideSelectedWidgets()
{
  const widgets = await miro.board.selection.get();
  let total = 1;
  for (let i = 0; i < widgets.length; i++){
    const num = parseInt(widgets[i].plainText);
    if (typeof num == 'number') {
      total /= num;
    }
  }
  let newX = widgets[widgets.length-1].bounds.x + widgets[widgets.length-1].bounds.width;
  let newY = widgets[widgets.length-1].bounds.y;
  const [sticker2] = await miro.board.widgets.create({
      type: 'sticker',
      text: total.toString(),
      x: newX,
      y: newY,
  });

  await miro.board.viewport.zoomToObject(sticker2);
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
    if (typeof text1 == 'number' && typeof text2 == 'number') {
      const [sticker2] = await miro.board.widgets.create({
        type: 'sticker',
        text: randomNumber.toString(),
        x: newX,
        y: newY,
    });
  
    await miro.board.viewport.zoomToObject(sticker2);
    }
  } 
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
