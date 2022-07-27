(() => {
  const utils = {};
  if (typeof window !== "undefined") {
    window.utils = utils;
  }
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = utils;
  }
})();
