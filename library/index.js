class Library {
  filter(list, fn) {
    const result = [];
    list.forEach((val) => {
      if (fn(val)) {
        result.push(val);
      }
    });
    return result;
  }

  reduce(list, fn, initialValue) {
    return list.length
      ? this.reduce(list.slice(1), fn, fn(initialValue, list[0]))
      : initialValue;
  }

  flatten(arr) {
    const flat = [];
    arr.forEach((el) => {
      if (Array.isArray(el)) {
        flat.push(...this.flatten(el));
      } else {
        flat.push(el);
      }
    });
    return flat;
  }
}

module.exports = new Library();
