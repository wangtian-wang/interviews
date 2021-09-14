function throttle(fn, interval = 16) {
  let open = true;
  return (...args) => {
    if (!open) {
      return;
    }
    open = false;
    fn(...args);
    const now = new Date().getTime();
    const gap = now % interval;
    setTimeout(() => {
      open = true;
    }, interval - gap);
  };
}
