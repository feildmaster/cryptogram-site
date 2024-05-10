import Clue from './Clue.js?v=0';
import Tile from './Tile.js?v=0';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default class Puzzle {
  static get ALPHA() {
    return ALPHA;
  }
  /**
   * @type {Set<Clue>}
   */
  #clues = new Set();

  constructor(clues = [], guesses = []) {
    const last = clues.length - 1;
    clues.forEach((word = [], index) => {
      if (!word.length || word[0] === 0) return;
      word.forEach((clue) => this.#clues.add(new Clue(clue)));
      if (index === last) return;
      this.#clues.add(new Clue(' '));
    });
    if (!this.length) return;
    guesses.forEach(([num, char]) => {
      const number = Number(num);
      if (
        !Number.isInteger(number) ||
        typeof char !== 'string' ||
        !this.numbers.includes(number) || (
          number > 0 &&
          !this.letters.includes(char)
        )
      ) return;
      this.set(number, char);
    });
  }

  get letters() {
    const letters = new Set(ALPHA);

    this.#values.forEach(({ char, code }) => {
      if (!Number.isInteger(code) || code < 0) return;
      letters.delete(char.toLowerCase());
    });

    return [...letters];
  }

  get numbers() {
    const numbers = new Set([0]);
    numbers.delete(0);
    for (const clue of this.#values) {
      if (clue.isSet() || !clue.isPuzzle()) continue;
      numbers.add(clue.code);
    }
    return [...numbers];
  }

  get message() {
    return this.#values.join('');
  }

  get solved() {
    return !this.#values.some(({ char: symbol }) => symbol === Clue.SYMBOL);
  }

  get length() {
    return this.#clues.size;
  }

  get #values() {
    return [...this.#clues.values()];
  }

  set(number, letter = '') {
    if (!Number.isInteger(number)) throw new Error(number);
    if (typeof letter !== 'string') throw new Error(letter);
    if (letter && !ALPHA.includes(letter)) throw new Error(letter);
    if (letter && number > 0 && !this.letters.includes(letter)) return false;
    this.#values.some((clue) => {
      if (clue.code !== number) return false;
      if (!letter) {
        clue.reset();
      } else {
        clue.set(letter);
      }
      return number < 0;
    });
    return true;
  }

  tiles() {
    return this.#values.map(clue => new Tile(clue, this));
  }

  mapping() {
    return this.#values.reduce((acc, clue) => {
      if (clue.isSet() && clue.isPuzzle()) {
        acc.set(clue.code, clue.char);
      }
      return acc;
    }, new Map());
  }

  toString() {
    return [
      this.message,
      `Numbers: ${this.numbers.join(' ')}`,
      `Letters: ${this.letters.join('')}`,
    ].join('\n');
  }
}
