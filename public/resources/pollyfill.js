if (Array.prototype.at === undefined) {
  Array.prototype.at = function at(index) {
    const relativeIndex = Number.isInteger(index) ? index : 0;
    const position = relativeIndex >= 0 ? relativeIndex : this.length + relativeIndex;
    if (position < 0 || position > this.length) {
      return undefined;
    }
    return this[position];
  };
}
