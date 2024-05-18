import '../resources/pollyfill.js';
import Puzzle from './Puzzle.js';
import { removeClass } from './utils.js';
import './Keyboard.js';

/**
 * @type {HTMLDivElement}
 */
const board = document.querySelector('#board');
/**
 * @type {Puzzle?}
 */
let current;

function load(rawPuzzle = '', guesses = []) {
  // Ideally I could do this without so much mapping, but I'm lazy
  const clues = rawPuzzle.split(/[\/; ]/)
    .map((word) => word.length && [...word.matchAll(/(\[.*\]|[a-z]|[1-2]\d|-?[1-9]|[^,\s]|\d+|.$)/gmi)]
      .map(([, clue]) => {
        if (!clue?.length) return false;
        const num = Number(clue);
        // Cryptogram uses 27, so... we'll allow 1<>29 "cyphers"
        if (Number.isInteger(num) && num < 30) {
          return num;
        }
        return clue;
      }));

  const puzzle = new Puzzle(clues, guesses);
  if (!puzzle.length) return;

  current = puzzle;
  // Clear board
  board.textContent = '';

  // Add tiles
  let word = newWordGroup();
  puzzle.tiles().forEach(({ container, isSpace }) => {
    if (isSpace) {
      board.append(container);
      word = newWordGroup();
    } else {
      word.append(container);
    }
  });
  updateKeyboard();
  board.dataset.ready = '';
}

function getChar(event) {
  const { key } = event;
  switch (key) {
    case 'Escape': {
      removeClass('selected');
      updateKeyboard();
      break;
    }
    case 'Tab':
      event.preventDefault();
      // fallthrough
    case 'Enter': {
      selectNext(event.shiftKey && event.isTrusted);
      break;
    }
    case 'Shift':
      // Do nothing
      break;
    case 'Backspace':
    case 'Delete':
    case ' ':
      return '';
    case 'ArrowLeft':
      selectNext(true);
      break;
    case 'ArrowRight':
      selectNext(false);
      break;
    default:
      return key.toLowerCase();
  }
  return undefined;
}

function selectNext(reverse = false) {
  const selected = document.querySelector('.selected');
  const elements = [...document.querySelectorAll('.board .clickable')];
  const length = elements.length;
  if (!selected) {
    const next = reverse ? length - 1 : 0;
    select(elements.at(next));
    return;
  }
  selected.classList.remove('selected');
  const index = elements.indexOf(selected) + 1;
  if (!index) return;
  const modifier = reverse ? -2 : (index === length ? -length : 0);
  const next = index + modifier;
  select(elements.at(next));
}

function select(element) {
  element?.classList.add('selected');
  updateKeyboard();
}

function newWordGroup() {
  const group = document.createElement('div');
  group.classList.add('word');
  board.append(group);
  return group;
}

function processURL() {
  const {
    pathname,
    search,
  } = location;
  if (!pathname && !search) return;
  const params = new URLSearchParams(search);
  const rawPuzzle = params.get('puzzle') || pathname;
  if (!rawPuzzle) return;
  params.delete('puzzle');

  load(decodeURIComponent(rawPuzzle), [...params.entries()]);
}

function updateUrlParams(search) {
  const params = `${new URLSearchParams(search)}`
  history.pushState(null, undefined, params ? `?${params}` : location.pathname);
}

export function updateKeyboard() {
  document.querySelectorAll('.keyboard button:disabled')
    .forEach((el) => {
      el.disabled = false;
    });
  // all valid if "?"
  const char = document.querySelector('.tile.selected')?._tile.isUnknown;
  if (char) {
    if (char !== '_') {
      document.querySelector(`.keyboard button[data-key="${char}"]`).disabled = true;
    }
  } else {
    const validLetters = current.letters;
    document.querySelectorAll('.keyboard button:not([data-special])').forEach((el) => {
      const key = el.dataset.key;
      el.disabled = !validLetters.includes(key);
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (!current) return;
  const {
    ctrlKey,
    repeat,
    shiftKey,
  } = event;
  if (ctrlKey) return;
  const char = getChar(event);
  if (repeat || typeof char !== 'string' || char.length > 1) return;

  const set = document.querySelector('.selected')?._tile.set(char);
  if (!set) return;

  updateUrlParams(current.mapping());
  if (shiftKey && char) { // Don't skip on delete
    selectNext();
  } else {
    // Select next also updates keyboard, so don't call it twice
    updateKeyboard();
  }
});

document.addEventListener('DOMContentLoaded', processURL);

// TODO: Update board rather than creating a new puzzle
window.addEventListener('popstate', processURL);
