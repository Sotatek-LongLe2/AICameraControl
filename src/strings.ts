export {};

Object.defineProperty(String.prototype, "format", {
  value: function () {
    // eslint-disable-next-line prefer-rest-params
    const args = [...Array.from(arguments)];

    // use replace to iterate over the string
    // select the match and check if related argument is present
    // if yes, replace the match with the argument
    return this.replace(/{([0-9]+)}/g, function (match: number, index: number) {
      // check if the argument is present
      return String(typeof args[index] == "undefined" ? match : args[index]);
    });
  },
});
