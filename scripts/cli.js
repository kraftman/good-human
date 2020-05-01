

var clui = require('clui'),
    clc = require('cli-color'),
    Line = clui.Line;

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const entries = [
  'A',
  'B',
  'C',
  'D'
]

let selected = 0;

const output = () => {
  
  entries.map((c, i) => {
    const headers = new Line();
    if(i === selected) {
      headers.column(c, 20, [clc.black, clc.bgWhite])
    } else {
      headers.column(c, 20, [clc.cyan])
    }

    headers.fill()
    .output();
  })
}

const spliceUp = () => {
  if (selected === 0) {
    return;
  }
  
  const a = entries[selected]
  const b = entries[selected-1]
  entries.splice(selected-1, 2, a, b)
  selected = selected -1
}

const spliceDown = () => {
  if (selected === entries.length) {
    return;
  }
  
  const a = entries[selected]
  const b = entries[selected+1]
  entries.splice(selected, 2, b, a)
  selected = selected +1
}

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  if (key.name === 'up') {
    selected = Math.max((selected - 1), 0);
  }
  if (key.name === 'down') {
    selected = Math.min((selected + 1), entries.length)
  }
  if (key.name === 'f') {
    spliceUp();
  }

  if (key.name === 's') {
    spliceDown();
  }
  entries.push(Math.random().toString())
  console.clear();
  output();
  // console.log(str)
  //console.log(key)
})
 
 