import Clue from './Clue.js';
import Tile from './Tile.js';

export const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default class Puzzle {
  /**
   * @type {Set<Clue>}
   */
  #clues = new Set();

  constructor(clues = []) {
    const last = clues.length - 1;
    clues.forEach((word = [], index) => {
      if (!word.length || word[0] === 0) return;
      word.forEach((clue) => this.#clues.add(new Clue(clue)));
      if (index === last) return;
      this.#clues.add(new Clue(' '));
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
      if (!clue.code || clue.isSet()) continue;
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
    if (letter && number > 0 && !this.letters.includes(letter)) return;
    this.#values.some((clue) => {
      if (clue.code !== number) return false;
      if (!letter) {
        clue.reset();
      } else {
        clue.set(letter);
      }
      return number < 0;
    });
    // TODO: Update URL
  }

  tiles() {
    return this.#values.map(clue => new Tile(clue, this));
  }

  toString() {
    return [
      this.message,
      `Numbers: ${this.numbers.join(' ')}`,
      `Letters: ${this.letters.join('')}`,
    ].join('\n');
  }
}
