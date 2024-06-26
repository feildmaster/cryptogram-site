const EVENT_NAME = 'ClueUpdate';
const UPDATE_EVENT = new CustomEvent(EVENT_NAME);

export default class Clue {
  static get SYMBOL() {
    return '_';
  }
  static #uniqueId = -1;
  static { // TODO: remove me when puzzle updates rather than recreates
    window.addEventListener('popstate', () => {
      this.#uniqueId = -1;
    });
  }

  #eventManager = document.createElement('div');
  #locked;
  #char = Clue.SYMBOL;
  #code = 0;

  constructor(code = '') {
    if (code instanceof Clue) {
      this.#code = code.#code;
      this.#char = code.#char;
    } else if (typeof code === 'string') {
      if (code) this.#set(code);
    } else if (Number.isInteger(code)) {
      if (code < 0) {
        this.#code = Clue.#uniqueId--;
      } else {
        this.#code = code;
      }
    } else {
      throw new Error(code);
    }
  }

  get char() {
    return this.#char;
  }

  get code() {
    return this.#code;
  }

  isSet() {
    return this.char !== Clue.SYMBOL && this.char.length === 1;
  }

  isPuzzle() {
    return Number.isInteger(this.code) && this.code;
  }

  set(symbol = '')  {
    if (!this.code) return;
    if (symbol) {
      this.#set(symbol);
    } else {
      this.#set(Clue.SYMBOL)
    }
  }

  onChange(listener) {
    this.#eventManager.addEventListener(EVENT_NAME, listener);
  }

  #set(symbol = '') {
    if (!symbol) throw new Error(symbol);
    if (this.char === symbol || this.char.length > 1) return;
    this.#isLocked();
    this.#char = symbol.toLowerCase();
    // Dispatch event
    this.#locked = EVENT_NAME;
    this.#eventManager.dispatchEvent(UPDATE_EVENT);
    this.#locked = false;
  }

  #isLocked() {
    if (!this.#locked) return;
    throw new Error(this.#locked);
  }

  toString() {
    return this.char;
  }
}
