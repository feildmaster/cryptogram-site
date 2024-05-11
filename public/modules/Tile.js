import Puzzle from './Puzzle.js?v=2';
import { removeClass } from './utils.js?v=1';

const tileContent = document.querySelector('#tile').innerHTML;

export default class Tile {
  static get SPECIAL() {
    return [...Puzzle.ALPHA, '_'];
  }

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
    if (!code || (char && !Puzzle.ALPHA.includes(char))) {
      return false;
    }
    return this.#puzzle.set(code, char);
  }

  #reset() {
    const { container } = this;
    container._tile = this;
    container.classList.add('tile');
    container.innerHTML = tileContent;
    if (this.#clue.isPuzzle()) {
      container.classList.add('clickable');
      container.addEventListener('click', onClick);
    }
    this.#update();
  }

  #update() {
    const { code, char } = this.#clue;
    this.container.querySelector('.symbol').textContent = getChar(char);
    this.container.querySelector('.number').textContent = getCode(code);

    this.container.classList.toggle('special', char.length > 1 || !Tile.SPECIAL.includes(char));
  }
}

function getChar(char) {
  if (char === '_') {
    return ' ';
  }
  return char;
}

function getCode(code) {
  if (!code || !Number.isInteger(code)) {
    return '';
  }
  if (code < 0) {
    return '?'
  }
  return code;
}

function onClick() {
  if (this.classList.contains('selected')) return;
  removeClass('selected');
  this.classList.add('selected');
}
