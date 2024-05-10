const EVENT_NAME = 'ClueUpdate';
const UPDATE_EVENT = new CustomEvent(EVENT_NAME);

export default class Clue {
  static get SYMBOL() {
    return '_';
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
    } else if (typeof code === 'number') {
      this.#code = code;
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
    return this.char !== Clue.SYMBOL;
  }

  set(symbol = '')  {
    if (!this.code) return;
    if (symbol) {
      this.#set(symbol);
    } else {
      this.reset();
    }
  }

  reset() {
    if (!this.code) return;
    this.#set(Clue.SYMBOL)
  }

  onChange(listener) {
    this.#eventManager.addEventListener(EVENT_NAME, listener);
  }

  #set(symbol = '') {
    if (!symbol) throw new Error();
    if (this.char === symbol) return;
    this.#isLocked();
    this.#char = symbol;
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
