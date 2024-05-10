import Puzzle from './Puzzle.js?v=0';
import { removeClass } from './utils.js?v=0';
import './Keyboard.js?v=0';

/**
 * @type {HTMLDivElement}
 */
const board = document.querySelector('#board');
/**
 * @type {Puzzle?}
 */
let current;

function load(rawPuzzle = '', guesses = []) {
  // TODO: Validate puzzle? No guesses for characters in puzzle.
  const clues = rawPuzzle.split(/[\/;]/)
    .map((word) => word.split(',')
      .map((clue) => {
        const num = Number(clue);
        if (Number.isInteger(num) && num <= 26) {
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
  if (shiftKey) {
    selectNext();
  }
});

window.addEventListener('popstate', processURL)

function getChar(event) {
  const key = event.key;
  switch (key) {
    case 'Escape': {
      removeClass('selected');
      return;
    }
    case 'Tab':
      event.preventDefault();
      // fallthrough
    case 'Enter': {
      selectNext(event.shiftKey);
      return;
    }
    case 'Shift':
      return;
    case 'Backspace':
    case 'Delete':
    case ' ':
      return '';
    default:
      return key.toLowerCase();
  }
}

function selectNext(reverse = false) {
  const selected = document.querySelector('.selected');
  const elements = [...document.querySelectorAll('.board .clickable')];
  const length = elements.length;
  if (!selected) {
    const next = reverse ? length - 1 : 0;
    elements.at(next).classList.add('selected');
    return;
  }
  selected.classList.remove('selected');
  const index = elements.indexOf(selected) + 1;
  if (!index) return;
  const modifier = reverse ? -2 : (index === length ? -length : 0);
  const next = index + modifier;
  elements.at(next)?.classList.add('selected');
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

  load(rawPuzzle, params.entries());
}

function updateUrlParams(search) {
  const params = `${new URLSearchParams(search)}`
  history.pushState(null, undefined, params ? `?${params}` : location.pathname);
}

document.addEventListener('DOMContentLoaded', processURL);
