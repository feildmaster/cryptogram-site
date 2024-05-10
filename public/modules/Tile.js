import { ALPHA } from './Puzzle.js';
import { removeClass } from './utils.js';

const tileContent = document.querySelector('#tile').innerHTML;

export default class Tile {
  #clue;
  #puzzle;
  #container;

  /**
   * @param {import('./Clue')} clue
   * @param {import('./Puzzle')} puzzle
   */
  constructor(clue, puzzle) {
    this.#clue = clue;
    this.#puzzle = puzzle;

    this.#container = document.createElement('div');
    this.#reset();
    clue.onChange(() => {
      try {
        this.#update();
      } catch {
        this.#reset();
      }
    });
  }

  get container() {
    return this.#container;
  }

  get isSpace() {
    return this.#clue.char === ' ';
  }

  set(char) {
    const { code } = this.#clue;
    if (!code) {
      return false;
    }
    this.#puzzle.set(code, char);
    return true;
  }

  #reset() {
    const { container } = this;
    container._tile = this;
    container.classList.add('tile');
    container.innerHTML = tileContent;
    if (this.#clue.code) {
      container.classList.add('clickable');
      container.addEventListener('click', onClick);
    }
    this.#update();
  }

  #update() {
    const { code, char } = this.#clue;
    this.container.querySelector('.symbol').textContent = getChar(char);
    this.container.querySelector('.number').textContent = getCode(code);

    this.container.classList.toggle('special', ![...ALPHA, '_'].includes(char));
  }
}

function getChar(char) {
  if (char === '_') {
    return ' ';
  }
  return char;
}

function getCode(code) {
  if (!code) {
    return '';
  }
  if (code < 0) {
    return '?'
  }
  return code;
}

function onClick() {
  if (this.classList.contains('selected')) return;
  removeClass('selected')
  this.classList.add('selected');
}
