import Clue from './Clue.js';
import Tile from './Tile.js';

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
    clues.forEach((word = []) => {
      if (!word || word[0] === 0) return;
      if (this.length) {
        this.#clues.add(new Clue(' '));
      }
      word.forEach((clue) => this.#clues.add(new Clue(clue)));
    });
    if (!this.length) return;
    const { numbers } = this; // cache numbers, this can't change
    guesses.forEach(([num, char]) => {
      const number = Number(num);
      if (
        !Number.isInteger(number) ||
        typeof char !== 'string' ||
        !numbers.includes(number) || (
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
    if (number === 0) throw new Error(number);
    if (typeof letter !== 'string') throw new Error(letter);
    if (letter) {
      if (!ALPHA.includes(letter)) throw new Error(letter);
      if (number > 0 && !this.letters.includes(letter)) return false;
    }
    for (const clue of this.#values) {
      if (clue.code !== number) continue;
      const isSameCharacter = clue.char === letter;
      clue.set(letter);
      if (number > 0) continue;
      if (!isSameCharacter) break;
      return false;
    }
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
