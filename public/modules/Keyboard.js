const keys = [
  [
    ...'1234567890-'.split(''),
  ],
  [
    ...'qwertyuiop'.split(''),
    'Backspace',
  ],
  [
    'Spacer',
    //'Tab',
    ...'asdfghjkl'.split(''),
    'Spacer',
  ],
  [
    //'Shift',
    'ArrowLeft',
    ...'zxcvbnm'.split(''),
    //'Enter',
    'ArrowRight',
  ],
];

const keyboard = document.createElement('div');
let shiftKey = false;

function makeSpacer() {
  const div = document.createElement('div');
  div.classList.add('spacer');
  return div;
}

function makeButton(key) {
  if (key === 'Spacer') {
    return makeSpacer();
  }
  const button = document.createElement('button');
  button.dataset.key = key;
  button.innerText = getLabel(key);
  if (key === 'Shift') {
    button.classList.toggle('active', shiftKey);
  }
  if (button.innerText !== key) {
    button.dataset.special = '';
  }
  button.tabIndex = -1;
  button.addEventListener('click', onClick);
  return button;
}

function onClick() {
  const { key } = this.dataset;
  if (!key) throw new Error('???');
  document.dispatchEvent(new KeyboardEvent('keydown', {
    key,
    shiftKey,
  }));
}

function updateShiftButton() {
  document.querySelectorAll('button[data-key="Shift"]').forEach((el) => {
    el.classList.toggle('active', shiftKey);
  });
}

document.addEventListener('keydown', ({ key, isTrusted }) => {
  if (key === 'Shift') {
    shiftKey = isTrusted || !shiftKey;
    updateShiftButton();
  }
});

document.addEventListener('keyup', ({ key }) => {
  if (key !== 'Shift') return;
  shiftKey = false;
  updateShiftButton();
});

function getLabel(key) {
  switch (key) {
    case 'Tab':
        return '⇆';
    case 'Shift':
      return '↑';
    case 'Enter':
      return '↵';
    case 'Backspace':
    case 'Delete':
      return '←';
    case 'ArrowLeft':
      return '⇤';
    case 'ArrowRight':
      return '⇥';
    default:
      return key;
  }
}

keys.forEach((row) => {
  const container = document.createElement('div');
  container.classList.add('keyboard-row');
  row.forEach((key) => {
    container.append(makeButton(key));
  });
  keyboard.append(container);
});
keyboard.classList.add('keyboard');
document.body.append(keyboard);
