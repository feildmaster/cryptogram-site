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

    this.#values.forEach(({ char }) => letters.delete(char.toLowerCase()));

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

  get #values() {
    return [...this.#clues.values()];
  }

  set(number, letter) {
    if (typeof number !== 'number') throw new Error(number);
    if (typeof letter !== 'string') throw new Error(letter);
    if (letter && !ALPHA.includes(letter)) throw new Error(letter);
    this.#values.forEach((clue) => {
      if (clue.code !== number) return;
      if (!letter) {
        clue.reset();
      } else {
        clue.set(letter);
      }
    });
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
