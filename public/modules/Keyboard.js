const keys = [
  [
    ...'QWERTYUIOP'.split(''),
    'Backspace',
  ],
  [
    'Tab',
    ...'ASDFGHJKL'.split(''),
  ],
  [
    'Shift',
    ...'ZXCVBNM'.split(''),
    'Enter',
  ],
];

const keyboard = document.createElement('div');
let shiftKey = false;

function makeButton(key) {
  const button = document.createElement('button');
  button.dataset.key = key;
  button.innerText = getLabel(key);
  if (key === 'Shift') {
    button.classList.toggle('active', shiftKey);
  }
  button.dataset.special = button.innerText !== key;
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
